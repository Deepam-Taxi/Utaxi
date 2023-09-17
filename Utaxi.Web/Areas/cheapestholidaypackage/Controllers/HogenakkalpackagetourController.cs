using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class HogenakkalpackagetourController : Controller
    {
        // GET: cheapestholidaypackage/Hogenakkalpackagetour
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinhogenakkalfalls()
        {
            ViewBag.Title = "Taxi  for Hogenakkal  Falls | Up to 4 Passenger Travel @ Rs.3119/-";
            ViewBag.Description = "Hogenakkal waterfalls is one of the good place in Dharmapuri, taxi from bangalore to hogenakkal falls, Book Cab for Hogenakkal Oneway & Round Trip";
            ViewBag.Keywords = "Good one day trip but risky place for boating, Cheap Taxi Booking One day trip Hogenakkal waterfalls , Car Rental Services u taxi , Online Cab Booking, hogenakkal boating, Book Taxi for Hogenakkal, Hogenakkal Falls 1 day Tourist Places, hogenakkal falls tamil nadu, hogenakkal boat house";
            ViewBag.PackageValue = "36";

            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-hogenakkal-one-day-package.aspx");
        }
    }
}