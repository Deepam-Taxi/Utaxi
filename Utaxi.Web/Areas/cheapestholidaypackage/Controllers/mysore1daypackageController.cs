using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class mysore1daypackageController : Controller
    {
        // GET: cheapestholidaypackage/mysore1daypackage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinmysore()
        {
            ViewBag.Title = "One Day Trip Mysore | Mysore One Day Packages @ Rs.3199/-";
            ViewBag.Description = "Book Bangalore to Mysore cab with u taxi, One Day Mysore Local Sightseeing Cabs, Mysore Sightseeing Taxi  ";
            ViewBag.Keywords = "bangalore to mysore cab service, Taxi Service from Bangalore to Mysore, One way Cab from Bangalore, Taxi Service in Mysore, Channapatna Toys in mysore. One Day Trip To Mysore Climb Up to the Chamundi Temple. Admire the Mysore Palace";
            ViewBag.PackageValue = "12";
            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-mysore-one-day-tour-package.aspx");
        }
    }
}