using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class coorgpackagetourController : Controller
    {
        // GET: cheapestholidaypackage/coorgpackagetour
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceincoorg()
        {
            ViewBag.Title = "Cab Bangalore to Coorg | Tour Package for 1 Night 2 Days Trip @ Rs.5,799/-";
            ViewBag.Description = "Outstation Cabs from Bangalore to Coorg, Book Cabs Oneway, Round Trip, cheapest  taxi from Bangalore to Coorg  ";
            ViewBag.Keywords = "Bangalore to Coorg Cabs, Bangalore to Coorg Taxi, Taxi Service from Bangalore to Coorg, Travel package to Coorg for 1 Night/2 Days, Coorg Tour Packages, Book Coorg Holiday Travel Packages, cheapest cab service for outstation, Coorg  Sightseeing Packages";
            ViewBag.PackageValue = "39";
            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-coorg-tour-package-for-1-night-2-days.aspx");
        }
    }
}