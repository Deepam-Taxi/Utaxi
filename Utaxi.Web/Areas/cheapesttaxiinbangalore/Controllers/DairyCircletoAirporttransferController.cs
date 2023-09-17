using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class DairyCircletoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/DairyCircletoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Book Taxi from  Dairy Circle to Airport Pickup Rs 474/-";
            ViewBag.Description = "AIRPORT PICKUP TAXI from Kempegowda International Airport. Book Taxi from Airport to anywhere in Bangalore, dairy circle to international airport pickup bangalore";
            ViewBag.Keywords = "airport transfer bangalore, airport pickup taxi bangalore, airport pickup bangalore, airport pickup bangalore offer, bangalore airport pickup offers, bangalore airport pickup, airport pickup taxi bangalore, airport pickup bangalore 500 rs, airport pickup taxi bangalore, cab for airport pickup in bangalore, airport pickup and drop bangalore, bangalore airport pickup taxi offers, city taxi bangalore airport pickup, airport pickup taxi, bangalore airport pickup taxi, airport pickup and drop Bangalore, bangalore airport pickup, airport pickup bangalore, airport pickup";
            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Cab Services in Bangalore from Dairy Circle to Airport Drop Rs 674/- ";
            ViewBag.Description = "AIRPORT DROP TAXI from Kempegowda International Airport. Book Cab from Airport to anywhere in Bangalore, dairy circle to international airport drop bangalore";
            ViewBag.Keywords = "airport transfer bangalore, airport pickup taxi bangalore, airport pickup bangalore, airport pickup bangalore offer, bangalore airport pickup offers, bangalore airport pickup, airport pickup taxi bangalore, airport pickup bangalore 500 rs, airport pickup taxi bangalore, cab for airport pickup in bangalore, airport pickup and drop bangalore, bangalore airport pickup taxi offers, city taxi bangalore airport pickup, airport pickup taxi, bangalore airport pickup taxi, airport pickup and drop Bangalore, bangalore airport pickup, airport pickup bangalore, airport pickup";
            return View();

        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Dairy Circle Bangalore to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge";
            ViewBag.Description = "Book Taxi for Round Trip One Way from Dairy Circle, Local & Outstation Cab Service in Bangalore. Get multiple car options withU Taxi like - Hatchback, Sedan & SUV";
             ViewBag.Keywords = "airport transfer bangalore, airport pickup taxi bangalore, airport pickup bangalore, airport pickup bangalore offer, bangalore airport pickup offers, bangalore airport pickup, airport pickup taxi bangalore, airport pickup bangalore 500 rs, airport pickup taxi bangalore, cab for airport pickup in bangalore, airport pickup and drop bangalore, bangalore airport pickup taxi offers, city taxi bangalore airport pickup, airport pickup taxi, bangalore airport pickup taxi, airport pickup and drop Bangalore, bangalore airport pickup, airport pickup bangalore, airport pickup";
            return View();
           
        }
    }
}