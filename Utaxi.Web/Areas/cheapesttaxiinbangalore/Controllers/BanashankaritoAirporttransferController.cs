using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class BanashankaritoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/BanashankaritoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Airport to Banashankari Rs 674/- No Toll & Upto 4 Passenger";
            ViewBag.Description = "From Airport to banashankari BANGALORE AIRPORT BUS SERVICE  Compare to Bmtc and Vayu Vajra Services fares and costlier than our Taxi services of Rs-674/- for 4 people and we have  City taxi Services in Bangalore Girinagar and Rajarajeshwari Nagarin the  west, Basavangudi in the north, Jayanagar and J.P. Nagar in the east, and Padmanabhanagar, Kumaraswamy Layout, ISRO Layout, Vasanthapura  taxi fare also same";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Book Cab from Banashankari to Airport Drop 674/- ";
            ViewBag.Description = "Vayu Vajra Services fares and costlier than our Taxi services of Rs-674/- All included Up to 4 passenger travel  areas such as Hanumanthanagar, Byatarayanapura, Srinagar, Nagendra Block, Kalidasa Layout, Raghavendra Block, Brindavan Nagar, Srinivasa Nagar, Vidyapeetha, SBM colony and Ashok Nagar. Best taxi service in Bangalore ";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Taxi from Banashankari to Airport round trip Rs 1220/- All included Up to 4 passenger travel";
            ViewBag.Description = "U Taxi is a leading online car rental & Best taxi service providing in Bengaluru. U taxi is providing lowest price cab service in Bengaluru. For Airport Pickup &  Airport Drop and Online taxi booking in Bengaluru for affordable price.";

            return View();
        }
    }
}