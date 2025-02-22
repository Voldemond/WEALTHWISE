using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WealthWise.Models;
using WealthWise.Repositories;

namespace WealthWise.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost("pay")]
        public async Task<IActionResult> PlaceOrder([FromBody] Order order)
        {
            if (order == null)
                return BadRequest("Invalid order request");

            var createdOrder = await _orderRepository.PlaceOrder(order);
            return Ok(createdOrder);
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById(long orderId)
        {
            var order = await _orderRepository.GetOrderById(orderId);
            if (order == null) return NotFound("Order not found");
            return Ok(order);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrdersForUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var orders = await _orderRepository.GetAllOrdersForUser(long.Parse(userId));
            return Ok(orders);
        }

        [HttpPatch("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(long orderId)
        {
            var result = await _orderRepository.CancelOrder(orderId);
            if (!result) return BadRequest("Order cannot be canceled");
            return Ok(new { message = "Order canceled successfully" });
        }

        [HttpPatch("{orderId}/execute")]
        public async Task<IActionResult> ExecuteTrade(long orderId)
        {
            var result = await _orderRepository.ExecuteTrade(orderId);
            if (!result) return BadRequest("Trade execution failed");
            return Ok(new { message = "Trade executed successfully" });
        }
    }
}
