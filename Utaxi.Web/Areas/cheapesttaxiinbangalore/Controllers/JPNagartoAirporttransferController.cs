using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class JPNagartoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/JPNagartoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Taxi  from Bangalore Airport to JP Nagar @ Rs 474/-No Toll";
            ViewBag.Description = "Book Cabs for Rent Hire Local Cabs Online at Lowest Cabs Prices  in Bangalore Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to JP Nagar Drop Rs 474/-";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "JP Nagar to Bangalore Airport Taxi Rs 674/-";
            ViewBag.Description = "And Guaranteed Pickup from JP Nagar to airport transfer available 24 hours service Get best deals from U taxi Bengaluru to Airport Drop and pickup for best and affordable price in Bengaluru cab service";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Taxi fare in Bangalore JP Nagar to Airport Round trip Rs 1220/- All included Up to 4 passenger travel";
            ViewBag.Description = "U taxi cab service is the best and reputed cabs service provider in Bengaluru, We offering 24 hours city taxi service, we provide luxury city cab and Airport taxi in low price";

            return View();
        }
    }
}