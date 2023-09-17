using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class JalahallitoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/JalahallitoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Cab for Airport Pickup Rs 474/- All included Upto 4 Pasenger";
            ViewBag.Description = "We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Jalahalli Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Airport Taxi services Jalahalli To Airport  Drop 674/-";
            ViewBag.Description = "Bengaluru Taxi is an important way to commute in Bengaluru today. Find everything you want to know about Bengaluru cabs. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Jalahalli to airport pickup";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Book City call Taxi through Jalahalli to Airport round trip just Rs 1220/- All included Up to 4 passenger travel";
            ViewBag.Description = "Bengaluru U taxi Cabs Service are providing Local pickup and drop, Airport to Railway Station pickup and drops, Hourly Packages, Outstation (km charges), On day trip, Holiday package for outstation (fixed price) for lowest and affordable price in Bengaluru.";

            return View();
        }
    }
}