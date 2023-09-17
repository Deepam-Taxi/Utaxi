using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class FrazertowntoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/FrazertowntoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Bangalore Taxi from Airport to Frazer Town Rs 474/- No Toll";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, as Frazer Town, officially Pulakeshinagar is a suburb of Bangalore Cantonment  taxi in Bangalore";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Local taxi service in Bangalore Frazer Town to Airport Drop 674/-";
            ViewBag.Description = "U Taxi Services anywhere in Bengaluru Cab services 24x7 All A/C &amp; Non A/C Taxis. Will be Safe and Reliable Transfers for lowest price taxi in Bengaluru to airport and airport to all over Bengaluru.";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Frazertown to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge";
            ViewBag.Description = "Book a cabs from U taxi service in Bengaluru Intercity car Hire for best ever airport cab services for the lowest price in all over Bengaluru to airport drop &amp; airport pick up, Airport round Trip.";

            return View();
        }
    }
}