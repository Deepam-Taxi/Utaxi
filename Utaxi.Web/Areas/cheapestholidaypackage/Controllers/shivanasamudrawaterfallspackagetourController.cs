using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class shivanasamudrawaterfallspackagetourController : Controller
    {
        // GET: cheapestholidaypackage/shivanasamudrawaterfallspackagetour
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinshivanasamudrawaterfalls()
        {
            ViewBag.Title = "Cab for 1 Day Trip Shivanasamudra & Talakad @ Rs 3199/-";
            ViewBag.Description = "Book Cabs for Shivanasamudra, Talakadu & Somanathapura Day Tour from Bangalore, Shivanasamudra Falls is one the famous attraction place from Bangalore Best Package";
            ViewBag.Keywords = "Best waterfalls place Gaganachukki Falls,  Book taxi fro 1day Bharachukki Falls,  Cab for One day outing Ranganathaswamy Temple, Shivanasamudra, Trip to Talakadu, Kaveri Talakadu, Mysuru, sand beach of river bank, Beach in Bangalore - Talakadu ";
            ViewBag.PackageValue = "38";

            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-shivanasamudra-talakad-one-day-trip.aspx");
        }
    }
}