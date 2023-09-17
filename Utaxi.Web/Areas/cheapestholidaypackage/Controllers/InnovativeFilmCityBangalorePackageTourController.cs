using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class InnovativeFilmCityBangalorePackageTourController : Controller
    {
        // GET: cheapestholidaypackage/InnovativeFilmCityBangalorePackageTour
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinInnovativefilmcityBangalore()
        {
            ViewBag.Title = "Taxi for Innovative Film City in Bengaluru  @ Rs.1549/-"; 
            ViewBag.Description = "Book Cabs  for Best place to visit in bangalore. Attractions Innovative Film City in Bangalore awesome place to have fun book Utaxi. It has various attractions such as Aqua Kingdom, Cartoon City";
            ViewBag.Keywords = "taxi  for Innovative Film City Fun Entertainment, Bangalore to Innovative Film City Cabs, Book Cabs for Innovative Film City, Hire Local Cabs for best 1 day Innovative Film City in Bengaluru, mysore innovative film city";
            ViewBag.PackageValue = "37";

            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-innovative-film-city-one-day-trip.aspx");
        }
    }
}