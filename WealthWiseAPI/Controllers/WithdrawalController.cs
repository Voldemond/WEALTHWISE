using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WealthWiseAPI.DTOs;
using WealthWiseAPI.Models;
using WealthWiseAPI.Services;

namespace WealthWiseAPI.Controllers
{
    [Route("api/withdrawal")]
    [ApiController]
    public class WithdrawalController : ControllerBase
    {
        private readonly WithdrawalService _withdrawalService;

        public WithdrawalController(WithdrawalService withdrawalService)
        {
            _withdrawalService = withdrawalService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<WithdrawalDTO>>> GetWithdrawals()
        {
            return Ok(await _withdrawalService.GetAllWithdrawalsAsync());
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Withdrawal>> RequestWithdrawal([FromBody] CreateWithdrawalDTO dto)
        {
            var userId = long.Parse(User.FindFirst("id").Value);
            return Ok(await _withdrawalService.CreateWithdrawalAsync(userId, dto));
        }

        [HttpPatch("{id}/proceed/{accept}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Withdrawal>> ProceedWithdrawal(long id, bool accept)
        {
            var updatedWithdrawal = await _withdrawalService.ProceedWithdrawalAsync(id, accept);
            if (updatedWithdrawal == null) return NotFound();
            return Ok(updatedWithdrawal);
        }
    }
}
