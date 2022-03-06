import { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import update from 'immutability-helper'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import currencyIcon from '../../images/currencyIcon.svg'
import Modal from '../Modals/Modal/Modal'
import OrderDetails from '../Modals/OrderDetails/OrderDetails'
import typeOfIngredient from '../../utils/propTypes'
import Loader from '../Auxiliary/Loader/Loader'
import ModalOverlay from '../Modals/ModalOverlay/ModalOverlay'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import {
  addToConstructor,
  removeIngredient,
  calculatePrice,
  postOrder,
  postOrderModal,
  modifyStuffing
} from '../../services/actions'

const ConstrucorElement = ({ element, moveIngredient, findIngredient }) => {
  const dispatch = useDispatch()  
  const onDelete = (element) => {
    dispatch(removeIngredient(element))
    dispatch(calculatePrice())
  } 

  const originalIndex = findIngredient(element.constructorID).index

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'constructorElement',
      item: { constructorID: element.constructorID, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { constructorID: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveIngredient(droppedId, originalIndex)
        }
      },
    }),
    [element.constructorID, originalIndex, moveIngredient],
  )
  const [, drop] = useDrop(
    () => ({
      accept: 'constructorElement',
      hover({ constructorID: draggedId }) {
        if (draggedId !== element.constructorID) {
          const { index: overIndex } = findIngredient(element.constructorID)
          moveIngredient(draggedId, overIndex)
        }
      },
    }),
    [findIngredient, moveIngredient],
  )

  return (
    <li className={BurgerConstructorStyles.element} style={{opacity: isDragging ? 0 : 1}} ref={(node) => drag(drop(node))}>
      <div className={BurgerConstructorStyles.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => onDelete(element)}
      />
    </li>
  )
}

const Ingredients = ({ ingredients }) => {
  const { stuffing } = useSelector((store) => store.constructorReducer)
  const dispatch = useDispatch()

  const findIngredient = useCallback(
    (id) => {
      const element = stuffing.filter((el) => el.constructorID === id)[0]
      return {
        element,
        index: stuffing.indexOf(element),
      }
    },
    [stuffing],
  )
  const moveIngredient = useCallback(
    (constructorID, atIndex) => {
      const { element, index } = findIngredient(constructorID)     
      dispatch(modifyStuffing(update(stuffing, {
        $splice: [
          [index, 1],
          [atIndex, 0, element],
        ],
      })))      
    },
    [findIngredient, stuffing, dispatch],
  )

  const [ , drop] = useDrop(() => ({ accept: 'constructorElement' }))

  

  return (
    <ul className={BurgerConstructorStyles.ingredients} ref={drop}>
      {ingredients.map((el) => (
        <ConstrucorElement element={el} key={el.constructorID} moveIngredient={moveIngredient} findIngredient={findIngredient} />
      ))}
    </ul>
  )
}

const Order = ({ cost, ingredients }) => {
  const dispatch = useDispatch()
  const { isModalOpen, orderDetails } = useSelector((store) => store.constructorReducer)
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)

  const modalOpenHandler = useCallback(() => {
    dispatch(postOrder(ingredients))
  }, [dispatch, ingredients])

  const modalCloseHandler = useCallback(() => dispatch(postOrderModal(false)), [dispatch])

  return (
    <div className={'mr-4 mt-10 ' + BurgerConstructorStyles.order}>
      <div className={BurgerConstructorStyles.price}>
        <p className="text text_type_digits-medium">{cost}</p>
        <img src={currencyIcon} alt="Значок валюты" />
      </div>
      <Button type="primary" size="large" onClick={modalOpenHandler}>
        Оформить заказ
      </Button>
      {loading ? (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      ) : (
        isModalOpen && (
          <Modal onClose={modalCloseHandler}>
            <OrderDetails orderNumber={`${orderDetails.order.number}`.padStart(6, '0')} />
          </Modal>
        )
      )}
    </div>
  )
}

function BurgerConstructor() {
  const dispatch = useDispatch()
  const { stuffing, bun, price, constructorIngredients } = useSelector(
    (store) => store.constructorReducer
  )

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const onDropHandler = (item) => {
    dispatch(addToConstructor(item))
    dispatch(calculatePrice())
  }

  return (
    <section className={'pt-25 ' + BurgerConstructorStyles.constructor}>
      <div
        ref={drop}
        className={
          !bun.count
          ? BurgerConstructorStyles.container_empty
          : BurgerConstructorStyles.container          
        }
        style={{border: isOver ? '2px solid lightgreen' : 'none'}}
      >{
        bun.count 
        ? <>
          <div className={'pl-7 ' + BurgerConstructorStyles.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <Ingredients ingredients={stuffing} />
        <div className={'pl-7 ' + BurgerConstructorStyles.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div></>
        : <>
            <h2 style={{textAlign: 'center'}} className="mb-10 text text_type_main-large">Начните собирать свой бургер!</h2>
            <p style={{textAlign: 'center'}} className=" text text_type_main-medium">Перетаскивайте компоненты из левой части. Начинайте с выбора булки.</p>
          </> 
      }
      
      </div>
      <Order ingredients={constructorIngredients} cost={price} />
    </section>
  )
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(typeOfIngredient).isRequired).isRequired,
}

ConstrucorElement.propTypes = {
  element: PropTypes.object.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  findIngredient: PropTypes.func.isRequired,
}

Order.propTypes = {
  cost: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(PropTypes.shape(typeOfIngredient)).isRequired,
// }

export default BurgerConstructor
