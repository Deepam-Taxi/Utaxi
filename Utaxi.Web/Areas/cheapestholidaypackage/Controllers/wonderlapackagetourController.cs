using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class wonderlapackagetourController : Controller
    {
        // GET: cheapestholidaypackage/wonderlapackagetour
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinwonderla()
        {
            ViewBag.Title = "Cabs for Wonderla Amusement Park with Family @ Rs.1449/-";
            ViewBag.Description = "Book Bangalore to Wonderla Cabs - Affordable Cab Service with utaxi, ride now and plan your perfect weekend getaway with us, cheapest outstation cabs";
            ViewBag.Keywords = "wonderla to airport taxi, mysore to wonderla cab, Banglore to wonderla, majestic to wonderla cab fare, silk board to wonderla distance, bangalore airport to wonderla taxi booking, cheapest outstation cab for wonderla";
            ViewBag.PackageValue = "30";
            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/one-day-wonderla-bangalore-package.aspx");
        }
    }
}