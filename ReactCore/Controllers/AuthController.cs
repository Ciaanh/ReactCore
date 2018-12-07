using Microsoft.AspNetCore.Mvc;

namespace ReactCore.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [HttpPost("[action]")]
        public bool Login(string username)
        {
            return username == "nico";
        }

    }
}
