using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class bangaloredarshanpackageController : Controller
    {
        // GET: cheapestholidaypackage/bangaloredarshanpackage
        public ActionResult Index()
        {
            return View("bestplaceinbangalore");
        }
        public ActionResult bestplaceinbangalore()
        {
            ViewBag.Title = " Cabs for One day Bangalore local sightseeing tour @ Rs.1699/- ";
            ViewBag.Description = "Book cabs for Bangalore 1 day Trip Sedan @ Rs. 9 per/km ,  Cabs for bangalore sightseeing packages,  Taxi for Best One Day trips, Cubbon Park,  , Bangalore Palace , Iskcon Temple, bangalore one day trip cabs ";
            ViewBag.Keywords = "taxi  for sightseeing places in bangalore,  Outstation cab for Shiva Temple Bangalore |Kempfort, Old Airport Road| Darshan Timings,  cabs for one day sightseeing around bangalore, Isckon Temple in Bangalore, Book Taxi  for Hare Krishna Hill Temple, Art of Living Bangalore , Sri Sri Ravi Shankar Ashram, Outstation cab for Vidhana Soudha Bangalore - Timings, Entry Fees, , cab for Bannerghatta National Park Safari, Timings, Entry Fee, Bangalore Zoo,  Shivoham Shiva Temple,  Raja Rajeshwari Temple,  RR Nagar Bangalore";
            ViewBag.PackageValue = "30";
            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-sightseeing-one-day-packages.aspx");
        }
    }
}