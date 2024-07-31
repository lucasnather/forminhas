import { OrderRepository } from "../repository/order/OrderRepository.js";
import { MarkOrderAsFinishedService } from "../service/orders/MarkOrderAsFinishedService.js";

export function makeOrderFinished() {
    const orderRepository = new OrderRepository()
    const markOrderAsFinished = new MarkOrderAsFinishedService(orderRepository)

    return markOrderAsFinished
}