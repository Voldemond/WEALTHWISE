using System.Data.Entity;
using Microsoft.AspNetCore.Mvc;
using WealthWiseAPI.Data;
using WealthWiseAPI.Models;

namespace CryptoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinController : ControllerBase
    {

        private readonly AppDbContext _context;

        public CoinController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coin>>> GetCoins()
        {

            var CoinData =  _context.CoinData.ToList();

        //var CoinData = new List<Coin>
        //    {
        //        new Coin { Name = "Bitcoin", Symbol = "BTC", Price = 45000, MarketCap = 850000000000, Volume = 25000000000, Change24h = 2.3, ImageUrl = "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
        //        new Coin { Name = "Ethereum", Symbol = "ETH", Price = 3200, MarketCap = 380000000000, Volume = 18000000000, Change24h = 3.1, ImageUrl = "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
        //        new Coin { Name = "Binance Coin", Symbol = "BNB", Price = 400, MarketCap = 62000000000, Volume = 2500000000, Change24h = 1.5, ImageUrl = "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png" },
        //        new Coin { Name = "Solana", Symbol = "SOL", Price = 150, MarketCap = 55000000000, Volume = 4000000000, Change24h = 4.7, ImageUrl = "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
        //        new Coin { Name = "Cardano", Symbol = "ADA", Price = 1.20, MarketCap = 40000000000, Volume = 1500000000, Change24h = 2.0, ImageUrl = "https://assets.coingecko.com/coins/images/975/large/cardano.png" },
        //        new Coin { Name = "XRP", Symbol = "XRP", Price = 0.75, MarketCap = 35000000000, Volume = 1200000000, Change24h = 1.8, ImageUrl = "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png" },
        //        new Coin { Name = "Polkadot", Symbol = "DOT", Price = 25, MarketCap = 25000000000, Volume = 900000000, Change24h = 3.4, ImageUrl = "https://assets.coingecko.com/coins/images/12171/large/polkadot.png" },
        //        new Coin { Name = "Dogecoin", Symbol = "DOGE", Price = 0.10, MarketCap = 15000000000, Volume = 800000000, Change24h = 5.2, ImageUrl = "https://assets.coingecko.com/coins/images/5/large/dogecoin.png" },
        //        new Coin { Name = "Shiba Inu", Symbol = "SHIB", Price = 0.00003, MarketCap = 10000000000, Volume = 600000000, Change24h = 6.1, ImageUrl = "https://assets.coingecko.com/coins/images/11939/large/shiba.png" },
        //        new Coin { Name = "Polygon", Symbol = "MATIC", Price = 1.50, MarketCap = 12000000000, Volume = 500000000, Change24h = 2.9, ImageUrl = "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png" }
        //    };

            return Ok(CoinData);
        }
        //[HttpPost]
        //public async Task<ActionResult<CoinData>> AddCoin([FromBody] Coin newCoin)
        //{
        //    if (newCoin == null)
        //    {
        //        return BadRequest("Invalid coin data.");
        //    }

        //    var coinData = new CoinData
        //    {
        //        Name = newCoin.Name,
        //        Symbol = newCoin.Symbol,
        //        Price = newCoin.Price,
        //        MarketCap = newCoin.MarketCap,
        //        Volume = newCoin.Volume,
        //        Change24h = newCoin.Change24h
        //    };

        //    _context.CoinData.Add(coinData);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetCoins), new { id = coinData.Id }, coinData);
        //}
        [HttpPost]
        public async Task<ActionResult<CoinData>> AddCoin([FromBody] Coin newCoin)
        {
            if (newCoin == null)
            {
                return BadRequest("Invalid coin data.");
            }

            var coinData = new CoinData
            {
                Name = newCoin.Name,
                Symbol = newCoin.Symbol,
                Price = newCoin.Price,
                MarketCap = newCoin.MarketCap,
                Volume = newCoin.Volume,
                Change24h = newCoin.Change24h,
                //ImageUrl = string.IsNullOrEmpty(newCoin.ImageUrl) ? "https://via.placeholder.com/150" : newCoin.ImageUrl
            };

            _context.CoinData.Add(coinData);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCoins), new { id = coinData.Id }, coinData);
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoin(int id)
        {
            var coin = await _context.CoinData.FindAsync(id);

            if (coin == null)
            {
                return NotFound(); // 404 if coin doesn't exist
            }

            _context.CoinData.Remove(coin);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 Success but no response body
        }


    }
}
