using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class bangaloretomysorecabsController : Controller
    {
        // GET: cheapestholidaypackage/bangaloretomysorecabs
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinmysore()
        {
            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-mysore-one-day-tour-package.aspx");
        }
    }
}