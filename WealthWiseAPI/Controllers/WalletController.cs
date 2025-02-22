using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WealthWise.DTOs;
using WealthWise.Services;
using System.Security.Claims;

namespace WealthWise.Controllers
{
    [Authorize]
    [Route("api/wallet")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        private long GetUserId()
        {
            return long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetWalletBalance()
        {
            var userId = GetUserId();
            var wallet = await _walletService.GetWalletBalance(userId);
            return wallet == null ? NotFound() : Ok(wallet);
        }

        [HttpGet("transactions")]
        public async Task<IActionResult> GetWalletTransactions()
        {
            var userId = GetUserId();
            var transactions = await _walletService.GetWalletTransactions(userId);
            return Ok(transactions);
        }

        [HttpPut("deposit")]
        public async Task<IActionResult> DepositFunds([FromQuery] decimal amount, [FromQuery] string paymentId)
        {
            var userId = GetUserId();
            bool success = await _walletService.DepositFunds(userId, amount, paymentId);
            return success ? Ok() : BadRequest();
        }

        [HttpPut("withdraw")]
        public async Task<IActionResult> WithdrawFunds([FromQuery] decimal amount)
        {
            var userId = GetUserId();
            bool success = await _walletService.WithdrawFunds(userId, amount);
            return success ? Ok() : BadRequest();
        }
    }
}
