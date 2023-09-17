using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class OotyandcoonoorPackageTourController : Controller
    {
        // GET: cheapestholidaypackage/OotyandcoonoorPackageTour
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinOotyandCoonoor()
        {
            ViewBag.Title = "Day Trip Ooty @ Rs.6999/- | Coonoor | sightseeing | Book cab for Outstation";
            ViewBag.Description = "Book Outstation Cabs for Ooty Coonoor Packages, Best offers on Ooty Outstation packages with u taxi, 3 Day Trip from Bangalore | Ooty Honeymoon packages | Honeymoon Package for 2 Days 1 Night";
            ViewBag.Keywords = "Ooty and coonoor trip package, outstation taxi service in bangalore, Cab from bangalore to ooty, Bangalore to Ooty One Way Taxi , cab for ooty sightseeing, Taxi Service from Bangalore to Ooty, cheapest cab from bangalore to ooty, Outstation Cabs from Bangalore to Ooty";
            ViewBag.PackageValue = "40";

            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/coorg-ooty-conoor-2-nights-3-days-package.aspx");
        }
    }
}