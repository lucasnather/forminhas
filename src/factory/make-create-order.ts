import { ClientRepository } from "../repository/client/ClientRepository.js"
import { OrderRepository } from "../repository/order/OrderRepository.js"
import { CreateOrderService } from "../service/orders/CreateOrderService.js"

export function makeCreateOrder() {
    const orderRepository = new OrderRepository()
    const clientRepository = new ClientRepository()
    const createOrderService = new CreateOrderService(orderRepository, clientRepository)

    return createOrderService

}