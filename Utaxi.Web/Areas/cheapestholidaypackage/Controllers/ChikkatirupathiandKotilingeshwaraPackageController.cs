using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class ChikkatirupathiandKotilingeshwaraPackageController : Controller
    {
        // GET: cheapestholidaypackage/ChikkatirupathiandKotilingeshwaraPackage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinChikkaThirupatiandkotilingeshwara()
        {
            ViewBag.Title = "Cab for Chikka Tirupati  Kotilingeshwara Packages Rs.1999/-";
            ViewBag.Description = "Taxi  services, Travel upto 4 passenger to Kotilingeshwara Temple in Kolar Kammasandra, taxi for Chikka Tirupati Temple Bengaluru, 10 million shiva lingas, Bangalore to  Chikka Tirupati Cabs";
            ViewBag.Keywords = "Kotilingeshwara Temple  Kolar, places to visit in kolar, chikka tirupathi whitefield bangalore, Lord Someshwara Temple, kolar best places to visit, Chikka Tirupati Marriage, Two Day Trip To Chikka Tirupati and Kotilingeshwara Lord Shiva Temple, Weekend Trip to Chikka Tirupathi";
            ViewBag.PackageValue = "12";
            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/chikka-tirupathi-kotilingeshwara-one-day-package.aspx");
        }
    }
}