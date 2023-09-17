using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class BTMLayouttoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/BTMtoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Book Taxi  from Airport from BTM Layout to Airport Pickup Rs 474/-";
            ViewBag.Description = "Taxi Cabs Booking Form BTM Layout, Our Airport Taxi Cab offers Flat rental basis from BTM Layout to Bengaluru International Airport";
            ViewBag.Keywords = "airport transfer bangalore, airport pickup taxi bangalore, airport pickup bangalore, airport pickup bangalore offer, bangalore airport pickup offers, bangalore airport pickup, airport pickup taxi bangalore, airport pickup bangalore 500 rs, airport pickup taxi bangalore, cab for airport pickup in bangalore, airport pickup and drop bangalore, bangalore airport pickup taxi offers, city taxi bangalore airport pickup, airport pickup taxi, bangalore airport pickup taxi, airport pickup and drop Bangalore, bangalore airport pickup, airport pickup bangalore, airport pickup";
            return View();
            
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Cab Services in Bangalore from BTM Layout to Airport Drop Rs 674/- ";
            ViewBag.Description = "Get best deals, discounts, offers in Bangalore  Airport transfer use taxi from airport or railway station to any location from U Taxi ";
            ViewBag.Keywords = "bangalore airport transfer, airport drop taxi bangalore, airport drop bangalore, airport drop bangalore offer, bangalore airport drop offers, bangalore airport drop, airport drop taxi bangalore, airport drop bangalore 500 rs, airport drop taxi bangalore, cab for airport drop in bangalore, airport pickup and drop bangalore, bangalore airport drop taxi offers, city taxi bangalore airport drop, airport drop taxi, bangalore airport drop taxi, airport pickup and drop,  bangalore airport drop cab, bangalore airport drop flat rate, bangalore airport to BTM Layout, BTM Layout to bangalore airport";
            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "BTM Layout to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge";
            ViewBag.Description = "Book Taxi for Round Trip One Way from BTM Layout, Local & Outstation Cab Service in Bangalore. Get multiple car options withU Taxi like - Hatchback, Sedan & SUV";
            ViewBag.Keywords = "airport taxi bangalore,airport taxi bangalore offer, bangalore airport taxi round trip, airport round trip cabs bangalore, airport round trip bangalore";
            return View();
        }
    }
}