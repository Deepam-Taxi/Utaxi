using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class MadiwalatoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/MadiwalatoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Book Taxi from  Madiwala to Airport Pickup Bangalore Rs 474/-";
            ViewBag.Description = "Airport Taxi & cabs Bangalore 24/7 service - On Time Pick Up and Pickup. Airport taxi Flat Price no hidden charges. 080 4684 4684.To Serve You, We Offer Reliable Services";
            ViewBag.Keywords = "airport transfer bangalore, airport pickup taxi bangalore, airport pickup bangalore, airport pickup bangalore offer, bangalore airport pickup offers, bangalore airport pickup, airport pickup taxi bangalore, airport pickup bangalore 500 rs, airport pickup taxi bangalore, cab for airport pickup in bangalore, airport pickup and drop bangalore, bangalore airport pickup taxi offers, city taxi bangalore airport pickup, airport pickup taxi, bangalore airport pickup taxi, airport pickup and drop Bangalore, bangalore airport pickup, airport pickup bangalore, airport pickup";
            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Cab Services in Bangalore from Madiwala to Airport Drop Rs 674/- ";
            ViewBag.Description = "Get lowest Cabs fares in bangalore by U Taxi for Bangalore Airport Drop,Airport drop for the time of 5:00 PM - 11:45 PM would cost Rs.674 for Indica Cab";
            ViewBag.Keywords = "bangalore airport transfer, airport drop taxi bangalore, airport drop bangalore, airport drop bangalore offer, bangalore airport drop offers, bangalore airport drop, airport drop taxi bangalore, airport drop bangalore 500 rs, airport drop taxi bangalore, cab for airport drop in bangalore, airport pickup and drop bangalore, bangalore airport drop taxi offers, city taxi bangalore airport drop, airport drop taxi, bangalore airport drop taxi, airport pickup and drop,  bangalore airport drop cab, bangalore airport drop flat rate, bangalore airport to madiwala, madiwala to bangalore airport";
            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Madiwala to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge";
            ViewBag.Description = "Book Taxi for Round Trip One Way from Madiwala, Local & Outstation Cab Service in Bangalore. Get multiple car options withU Taxi like - Hatchback, Sedan & SUV";
            ViewBag.Keywords = "airport taxi bangalore,airport taxi bangalore offer, bangalore airport taxi round trip, airport round trip cabs bangalore";
            return View();
        }
    }
}