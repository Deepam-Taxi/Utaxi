using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestprice.Controllers
{
    public class airporttaxibangaloreController : Controller
    {
        // GET: cheapestprice/airporttaxibangalore
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Book Airport Pickup @ Rs.474/- No toll charges | Taxi in Bangalore";
            ViewBag.Description = "Book Taxi from Airport to anywhere in Bangalore, Cabs for airport Pickup, airport cab, Airport Taxi, airport cabs Bangalore, best airport taxi in Bengaluru Airport pickup @ Rs.474/-, Call- 080 41 466 888";
            ViewBag.Keywords = "Airport pickup in Bengaluru,  airport pickup off, taxi near me, airport pickup to Kempegowda International Airport, taxi to airport fare, airport taxi service Bengaluru,  airport pickup services, taxi to airport,  Bangalore airport offers, taxi to airport price, flat rate, Bangalore airport taxi pickup, airport cabs offers, airport taxi Bangalore, airport Pickup cab offers Bangalore, cab to airport, airport taxi fares cheapest airport taxi Bengaluru";
            return Redirect("https://www.utaxi.in/bangalore/airport-taxi/airport-pickup.aspx");
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Book Airport Drop @ Rs.674/- | Airport Taxi Fares in Bengaluru";
            ViewBag.Description = "Book Taxi from Airport to anywhere in Bangalore, Cabs for airport Drop, taxi fares, Cab services, airport cabs Bengaluru, best airport cabs in bangalore Airport drop @ Rs.674/-, Call- 080 41 466 888";
            ViewBag.Keywords = "Airport drop in Bangalore,  airport drop off, cab near me, airport drop to Kempegowda International Airport, cab to airport fare, airport cab service Bengaluru,  airport drop services, cab services airport,  taxi airport offers, cab to airport price, flat rate, Bangalore airport cab pickup, airport cabs offers, airport taxi Bengaluru, airport Drop cab offers Bangalore, cabs to airport, airport cab fares, cheapest airport cabs in Bengaluru";
            return Redirect("https://www.utaxi.in/bangalore/airport-taxi/airport-drop.aspx");
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Cab Airport Round Trip @ Rs.1220/- Including 1 Hour Waiting";
            ViewBag.Description = "Book Bengaluru to Bangalore Airport Cabs Oneway & Round Trip @ Rs.1220/-, Services Available 24/7, Cab rental in Bengaluru, cheapest airport taxi bangalore";
            ViewBag.Keywords = "Online Car Rental from Bangalore to Bengaluru Airport, Airport Round trip  Bangalore, Airport Round trip cabs in bangalore, cabs Airport Round trip  transfer,  taxi Airport express round trip same day, airport taxi bangalore round trip, cab booking for round trip, Airport round trip charges, cab fares, cabs at lowest cost";
            return Redirect("https://www.utaxi.in/bangalore/airport-taxi/airport-round-trip.aspx");
        }
    }
}