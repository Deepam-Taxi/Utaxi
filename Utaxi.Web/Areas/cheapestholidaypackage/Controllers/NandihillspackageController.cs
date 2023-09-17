using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage.Controllers
{
    public class NandihillspackageController : Controller
    {
        // GET: cheapestholidaypackage/Nandihillspackage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult bestplaceinnandihills()
        {
            ViewBag.Title = "Bangalore to Nandi hills taxi service | Lowest Prices @ Rs.1499";
            ViewBag.Description = "Nandi Hills or Nandi Betta is an ancient hill fortress of situated in the Chikkaballapur district near Bangalore. Book cab from u taxi  for Nandi Hills sightseeing";
            ViewBag.Keywords = "Bangalore to Nandi Hills Cabs, Bangalore to Nandi Hills Taxi Service, Book cab for one day trip Nandi Hills with u taxi, 1 days Nandi Hills Tour Package - Best Nandi Hills Package";
            ViewBag.PackageValue = "31";
            return Redirect("https://www.utaxi.in/bangalore/holiday-package-taxi-services/bangalore-to-nandi-hills-one-day-sightseeing.aspx");
        }
    }
}