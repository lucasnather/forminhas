
import { OrderRepository } from "../repository/order/OrderRepository.js"
import { FindManyOrderService } from "../service/orders/FindManyOrderService.js"

export function makeFindManyOrder() {
    const orderRepository = new OrderRepository()
    const findManyOrderService = new FindManyOrderService(orderRepository)

    return findManyOrderService

}