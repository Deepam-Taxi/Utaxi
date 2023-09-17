using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest OutStation rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";
            ViewBag.Keywords = "Cab Services in Bangalore, Online Airport Taxi Booking, Airport Taxi in Bangalore, AC Cabs in Bangalore, Taxi Service in Bangalore, cheapest cabs service for outstation, Taxi Booking Car Rental Services";

            ViewBag.og_type = "business.business";
            ViewBag.og_title = "Airport Taxi | Cabs in Bangalore";
            ViewBag.og_description = "Airport Taxi in Bangalore - Rs 474/- Pick-Up, Rs 674/- Drop, Cheapest Outstation rates.Indica Rs.7/-Logan/Etios/Dzire Rs.9";
            ViewBag.og_url = "https://www.utaxi.in/";

            ViewBag.tw_title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.tw_description = "Airport Taxi in Bangalore - Rs 474/- Pick-Up, Rs 674/- Drop, Cheapest Outstation rates.Indica Rs.7/-Logan/Etios/Dzire Rs.9";

            //return Redirect("https://www.utaxi.in/"); 
            return View("Index");
        }
        public ActionResult Index_New()
        {
            ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest OutStation rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";
            ViewBag.Keywords = "Cab Services in Bangalore, Online Airport Taxi Booking, Airport Taxi in Bangalore, AC Cabs in Bangalore, Taxi Service in Bangalore, cheapest cabs service for outstation, Taxi Booking Car Rental Services";

            ViewBag.og_type = "business.business";
            ViewBag.og_title = "Airport Taxi | Cabs in Bangalore";
            ViewBag.og_description = "Airport Taxi in Bangalore - Rs 474/- Pick-Up, Rs 674/- Drop, Cheapest Outstation rates.Indica Rs.7/-Logan/Etios/Dzire Rs.9";
            ViewBag.og_url = "https://www.utaxi.in/";

            ViewBag.tw_title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.tw_description = "Airport Taxi in Bangalore - Rs 474/- Pick-Up, Rs 674/- Drop, Cheapest Outstation rates.Indica Rs.7/-Logan/Etios/Dzire Rs.9";

            //return Redirect("https://www.utaxi.in/"); 
            return View("Index_New");
        }
        public ActionResult Index_Sample()
        {
            ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest OutStation rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";
            ViewBag.Keywords = "Cab Services in Bangalore, Online Airport Taxi Booking, Airport Taxi in Bangalore, AC Cabs in Bangalore, Taxi Service in Bangalore, cheapest cabs service for outstation, Taxi Booking Car Rental Services";

            ViewBag.og_type = "business.business";
            ViewBag.og_title = "Airport Taxi | Cabs in Bangalore";
            ViewBag.og_description = "Airport Taxi in Bangalore - Rs 474/- Pick-Up, Rs 674/- Drop, Cheapest Outstation rates.Indica Rs.7/-Logan/Etios/Dzire Rs.9";
            ViewBag.og_url = "https://www.utaxi.in/";

            ViewBag.tw_title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.tw_description = "Airport Taxi in Bangalore - Rs 474/- Pick-Up, Rs 674/- Drop, Cheapest Outstation rates.Indica Rs.7/-Logan/Etios/Dzire Rs.9";

            //return Redirect("https://www.utaxi.in/"); 
            return View("Index_Sample");
        }
        
        public ActionResult HomePage()
        {
            ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest OutStation rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";
            ViewBag.Keywords = "Cab Services in Bangalore, Online Airport Taxi Booking, Airport Taxi in Bangalore, AC Cabs in Bangalore, Taxi Service in Bangalore, cheapest cabs service for outstation, Taxi Booking Car Rental Services";
            return View("Index");
        }

        public ActionResult SetVariable(string key, string value)
        {
            Session[key] = value;

            return this.Json(new { success = true });
        }

        public ActionResult Packages()
        {
            ViewBag.Title = "Holiday packages from Bengaluru 2 Days Coorg @ Rs.5,799/- ";
            ViewBag.Description = "1 days Mysore package tours from bangalore,  3 days coorg | 2 days ooty package tours from bangalore, wayanad tour package 2 days, coorg weekend packages from Bengaluru";
            ViewBag.Keywords = "cheapest taxi for outstation, cheapest package from Bangalore, goa tour package, Cab for kodaikanal tour package, bangalore to coonoor taxi package, bangalore to pondicherry tour package, munnar packages from bangalore for 3 days, ooty tour package for family, Best Honeymoon package from Bengaluru, mysore to coorg taxi, coorg sightseeing cab charges, Best tour package from Bengaluru, wayanad tour package, coorg weekend packages from Bengaluru, package tour from bangalore to coorg, Mysore local sightseeing packages";
            return View();
        }

        public ActionResult BestOffers()
        {
            ViewBag.Title = "Online Cab Booking at Lowest Fare | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bengaluru, Cheapest taxi service in Bengaluru, Best Cabs service in Bangalore, local taxi service in Bangalore, new taxi and cab service in Bengaluru";
            ViewBag.Keywords = "Cab Services in Bangalore, local taxi in Bengaluru, Online Airport Taxi Booking, Airport Pickup and Drop, Airport Taxi in Bengaluru, Airport Round Trip in Bangalore, Outstation Cabs Services in Bangalore, Online cab Booking, Taxi for Outstation, Cheapest taxi service, Bengaluru  airport no toll price, Outstation Cab at Lowest Fare, Airport Round trip Taxi, outstation taxi service in Bangalore, local cabs in bangalore";
            return Redirect("https://www.utaxi.in/bangalore/airport-taxi/bangalore-airport-taxi-offers.aspx");
        }

        public ActionResult BookPackages(int PackageID)//, int Fare, int ACType, int RateID)
        {
            ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest Out Station rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";

            ViewBag.PackageValue = PackageID.ToString();

            return View("Index");
        }

        public ActionResult googlereview()
        {
            return View();
        }

        //public ActionResult BookOffers(int serviceNameID)//, int Fare, int ACType, int RateID)
        //{
        //    ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
        //    ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest Out Station rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";
        //    ViewBag.AirportServiceNameID = serviceNameID.ToString();

        //    return View("Index");
        //}
    }
}