using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class WayanadpackagetourController : Controller
    {
        // GET: cheapestholidaypackage/Wayanadpackagetour
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinWayanad()
        {
            ViewBag.Title = "Cab from Bangalore to Wayanad 2 Days 1 Night @ Rs.7099/-";
            ViewBag.Description = "Wayanad 3 days Packages, Cab for Bangalore to Wayanad Tour Packages, For 2 nights 3 days book cab with u taxi, Outstation cabs for sight seeing in wayanad, wayanad sightseeing cab";
            ViewBag.Keywords = "wayanad cab service, Wayanad 3 days Packages – Bangalore to Wayanad Tour Packages, 2 nights 3 days,sight seeing in wayanad, tourist cab services in wayanad, cab services in wayanad, places to visit in wayanad for 1 day, wayanad homestay, wayanad sightseeing package";
            ViewBag.PackageValue = "41";

            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-wayanand-2-night-3-days-tour-package.aspx");
        }
    }
}