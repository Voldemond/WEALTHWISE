using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WealthWiseAPI.Services;
using WealthWiseAPI.DTOs;

namespace WealthWiseAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WatchlistController : ControllerBase
    {
        private readonly IWatchlistService _watchlistService;

        public WatchlistController(IWatchlistService watchlistService)
        {
            _watchlistService = watchlistService;
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserWatchlist()
        {
            long userId = GetUserId();
            var watchlist = await _watchlistService.GetUserWatchlistAsync(userId);
            return Ok(watchlist);
        }

        [HttpPatch("add/coin/{coinId}")]
        public async Task<IActionResult> AddCoinToWatchlist(string coinId)
        {
            long userId = GetUserId();
            var success = await _watchlistService.AddCoinToWatchlistAsync(userId, coinId);
            if (!success)
                return BadRequest("Coin already in watchlist.");
            return Ok("Coin added successfully.");
        }

        [HttpDelete("remove/coin/{coinId}")]
        public async Task<IActionResult> RemoveCoinFromWatchlist(string coinId)
        {
            long userId = GetUserId();
            var success = await _watchlistService.RemoveCoinFromWatchlistAsync(userId, coinId);
            if (!success)
                return BadRequest("Coin not found in watchlist.");
            return Ok("Coin removed successfully.");
        }

        private long GetUserId()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim)) throw new UnauthorizedAccessException("Invalid Token.");
            return long.Parse(userIdClaim);
        }
    }
}
