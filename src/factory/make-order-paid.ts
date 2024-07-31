import { OrderRepository } from "../repository/order/OrderRepository.js";
import { MarkOrderAsPaidService } from "../service/orders/MarkOrderAsPaidService.js";

export function makeOrderPaid() {
    const orderRepository = new OrderRepository()
    const markOrderAsPaid = new MarkOrderAsPaidService(orderRepository)

    return markOrderAsPaid
}