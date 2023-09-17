using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class KrishnarajapuramtoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/KrishnarajapuramtoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Taxi from Airport to Krishnarajapuram Rs 474/- All included";
            ViewBag.Description = "Get lowest Cabs fares in bangalore by U taxi  for cabs & taxi service in  Bangalore Looking for KR Puram to Kempegowda international Airport most economical way to reach Bangalore on time and don’t need to worry about price Bengaluru airport pickup to Krishnarajapuram Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Book reliable Cab Service Krishnarajapuram To Airport Drop 674/-";
            ViewBag.Description = "The cheapest way to travel from Bangalore city to airport is BMTC bus, but at peak hours, waiting for bus and taking bus to airport, becomes cumbersome and also the travel time will be very high for bus in peak traffic hour now cheapest taxi service in Bangalore  Compare to Bmtc and Vayu Vajra Services fares and costlier than our Taxi services of Rs-674/- for 4 people and we have City taxi Services in Bangalore";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Krishnarajapuram Taxi Hire To Airport Round trip Rs 1220/- All included Up to 4 passenger travel";
            ViewBag.Description = "For faster and easy accessibility all our Airport Taxi / Cabs are parked near the major locations of Krishnarajapuram  If you wish to hire a cab to reach the airport or other destinations, U taxi service providers stand ready, with a smart fleet in Bangalore";

            return View();
        }
    }
}