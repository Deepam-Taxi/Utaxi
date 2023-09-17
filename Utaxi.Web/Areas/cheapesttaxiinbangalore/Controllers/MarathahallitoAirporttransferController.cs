using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class MarathahallitoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/MarathahallitoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Airport To Marathalli we offer Rs 474/- up to 4 Passengers";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Marathalli Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Marathalli To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "Airport taxi service we specialized for airport transfers In Bangalore. Get quick and easy online quotes & executive cars with competitive prices. Hatchback Just Rs799. SUV Just Rs1599. Sedan Just Rs899. Highlights: Verified Drivers, 24/7 Customer Helpline available from U taxi cab service in Bengaluru. Experienced Drivers";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Marathalli to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "Taxi service for Bengaluru, Book a cab for full day 8 hours 80 kms package for local city ride or airport transfers in Bengaluru from U taxi cab service with specialized fares.";

            return View();
        }
    }
}