using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WealthWiseAPI.DTOs;
using WealthWiseAPI.Services;

namespace WealthWiseAPI.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    [Authorize] // Require authentication for notifications
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetNotifications(long userId)
        {
            var notifications = await _notificationService.GetNotificationsByUserId(userId);
            return Ok(notifications);
        }

        [HttpPost]
        public async Task<IActionResult> SendNotification([FromBody] NotificationDto notificationDto)
        {
            var notification = await _notificationService.SendNotification(notificationDto);
            return CreatedAtAction(nameof(GetNotifications), new { userId = notification.ToUserId }, notification);
        }
    }
}
