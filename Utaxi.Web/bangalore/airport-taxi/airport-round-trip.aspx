<%@ Page Title="" Language="C#" MasterPageFile="~/bangalore/airport-taxi/aiportMaster.Master" AutoEventWireup="true" CodeBehind="AirportSamplePage.aspx.cs" Inherits="Utaxi.Web.bangalore.airport_taxi.AirportSamplePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>
        Cab Airport Round Trip @ Rs.1220/- Including 1 Hour Waiting
    </title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main role="main" class="container">

        <div class="divAirportPickup row">
            <div class="row" style="margin: 5px 0px; width: 100%;">
                <div class="col-md-12">
                    <div class="card classPackage mb-3 clsAiportRoundTripSet0" style="text-align: center;">
                        <h1 style="margin-top: 20px;">Airport Round trip bangalore offers</h1>
                    </div>
                </div>
            </div>
            <div class="row" style="margin: 5px 0px; width: 100%;">
                <div class="col-md-6">
                    <div class="card border-dark mb-3">
                        <div class="card-header boldFields">
                            <ul class="nav nav-tabs card-header-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" id="idAirportTab" data-toggle="tab" href="#" onclick="showTabs('Airport');">Airport</a>
                                </li>

                            </ul>
                        </div>
                        <div class="card-body">
                            <div class="container" id="divSearchRides">
                                <div class="form-group mt-2 well" style="text-align: center;" id="airportPickupOptions">
                                    <label class="form-check-inline">
                                        <input type="radio" class="form-check-input" name="pickupOption" id="rdAirportPickup" value="1">Airport Pickup
                                    </label>
                                    <label class="form-check-inline">
                                        <input type="radio" class="form-check-input" name="pickupOption" id="rdAirportDrop" value="2">Airport Drop
                                    </label>
                                    <label class="form-check-inline">
                                        <input type="radio" class="form-check-input" name="pickupOption" id="rdAirportRT" checked value="3">Airport Round trip
                                    </label>
                                </div>
                                <div class="form-group mt-2 well" style="text-align: center;" id="outstationOptions">
                                    <label class="form-check-inline">
                                        <input type="radio" class="form-check-input" name="outstationOption" id="rdOutstationTrip" checked value="">One way
                                    </label>
                                    <label class="form-check-inline">
                                        <input type="radio" class="form-check-input" name="outstationOption" id="rdOutstationPackage" value="">Two way
                                    </label>
                                </div>
                                <div class="form-group mt-2" id="divPickup">
                                    <label for="pickupPlace" class="boldFields">Pickup place<span class="mandatoryFields">*</span></label>
                                    <div class="searchplaces form-control" id="pickupPlace">
                                        Enter Search Place
                                    </div>
                                    <input type="text" class="form-control" placeholder="Enter Search Place" id="pickupPlaceSearch">
                                    <div class="E_FromPlace E_Msg"></div>
                                </div>
                                <div class="form-group mt-2" id="divAiportPickupField">
                                    <label for="dropPlace" class="boldFields">Airport Pickup<span class="mandatoryFields">*</span></label>
                                    <input type="text" class="form-control" placeholder="Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India" disabled id="pickupPlaceAirportSearch">
                                </div>
                                <div class="form-group mt-2" id="divDrop">
                                    <label for="dropPlace" class="boldFields">Drop place<span class="mandatoryFields">*</span></label>
                                    <div class="searchplaces form-control" id="dropPlace">
                                        Enter Search Place
                                    </div>
                                    <input type="text" class="form-control" placeholder="Enter Search Place" id="dropPlaceSearch">
                                    <div class="E_ToPlace E_Msg"></div>
                                </div>
                                <div class="form-group mt-2" id="divAiportDropField">
                                    <label for="dropPlace" class="boldFields">Airport Drop<span class="mandatoryFields">*</span></label>
                                    <input type="text" class="form-control" placeholder="Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India" disabled id="dropPlaceAirportSearch">
                                </div>
                                <div class="form-group mt-2" id="divPackageType">
                                    <label for="PackageType" class="boldFields">Package Type<span class="mandatoryFields">*</span></label>
                                    <select name="ddlPackageType" id="ddlPackageType" class="form-control"></select>
                                </div>

                                <div class="form-group mt-2" id="divPickupTime">
                                    <label for="pickupdatetime" class="boldFields">Pickup Date & Time<span class="mandatoryFields">*</span></label>
                                    <div class="row">
                                        <div class="col-md-5 col-6">
                                            <div class='input-group date'>
                                                <input type='text' class="form-control" id="pickupdatepicker" placeholder="Pick Up Date" readonly />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-6">
                                            <input type="text" class="form-control" id="pickuptimepicker" placeholder="Pick Up Time" readonly>
                                        </div>
                                        <div class="col-md-3">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group mt-2" id="divDropTime">
                                    <label for="pickupdatetime" class="boldFields">Drop Date & Time<span class="mandatoryFields">*</span></label>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class='input-group date'>
                                                <input type='text' class="form-control" id="dropdatepicker" placeholder="mm/dd/yyyy" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" class="form-control" id="droptimepicker" placeholder="hh:mm AM/PM">
                                        </div>
                                        <div class="col-md-3">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mt-2" id="btnSearchNext">
                                    <button id="btnSubmit" class="btn btn-primary">Search Rides</button>
                                    <input type="hidden" value="" id="hdnServiceNameID" />
                                    <input type="hidden" value="" id="hdnServiceTypeID" />
                                    <input type="hidden" value="" id="hdnStatusID" />
                                    <input type="hidden" value="" id="hdndropPlaceID" />
                                    <input type="hidden" value="" id="hdnpickupPlaceID" />
                                    <input type="hidden" value="" id="hdnFare" />
                                    <input type="hidden" value="" id="hdnACType" />
                                    <input type="hidden" value="" id="hdnACTypeID" />
                                    <input type="hidden" value="" id="hdnRateID" />
                                    <input type="hidden" value="" id="hdnRequestID" />
                                    <input type="hidden" value="" id="hdnPaidAmount" />
                                    <input type="hidden" value="" id="hdnDiscount" />
                                    <input type="hidden" value="" id="hdnBalance" />
                                    <input type="hidden" value="" id="hdnPaymentType" />
                                    <input type="hidden" value="1" id="hdnOutstationTypeID" />
                                    <input type="hidden" value="1" id="hdnEnableOnlinePayment" />
                                    <input type="hidden" value="" id="hdncustomer_id" />

                                    <input type="hidden" value="" id="hdnpick_latitude" />
                                    <input type="hidden" value="" id="hdnpick_longitude" />
                                    <input type="hidden" value="" id="hdndrop_latitude" />
                                    <input type="hidden" value="" id="hdndrop_longitude" />


                                    <input type="hidden" id="hdnPackageType" />
                                    <input type="hidden" id="hdnAirportServiceNameID" />
                                    <input type="hidden" id="hdnPackageRateID" />
                                    <input type="hidden" id="hdnPackageACTypeID" />
                                    <input type="hidden" id="hdnPackageFare" />

                                </div>
                                <div class="form-group mt-2">
                                    <div class="alert alert-danger errorMsg">
                                        <strong>!</strong> Correct the errors
                                    </div>
                                </div>
                            </div>
                            <div id="divloadMap"></div>
                            <div class="container mt-2" id="divAvailableRides">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="row">
                                            <div class="col-md-7 col-6 mt-2">
                                                Available rides
                                            </div>
                                            <div class="col-md-4 col-6">
                                                <%--<button type="button" class="btn btn-primary bookingHeader">
                                            Non AC
                                        </button>--%>
                                                <button type="button" class="btn btn-primary bookingHeader">
                                                    AC
                                                </button>
                                            </div>
                                            <div class="col-md-1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush ratelist"></ul>
                                    </div>
                                </div>
                            </div>
                            <div class="container" id="divOTPVerification">
                                <div class="card">
                                    <div class="card-header">
                                        OTP verification
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group mt-2" id="divMobileNumber">
                                            <label for="mobileNumber" class="boldFields">Mobile number<span class="mandatoryFields">*</span></label>
                                            <input type="text" class="form-control numberOnly" id="mobileNumber" maxlength="10">
                                        </div>
                                        <div class="form-group mt-2" id="divOTP">
                                            <label for="OTP" class="boldFields">OTP<span class="mandatoryFields">*</span></label>
                                            <input type="text" class="form-control numberOnly" id="OTP">
                                        </div>
                                        <div class="form-group mt-2">
                                            <button id="btnSubmitOTP" class="btn btn-primary">Next</button>
                                            <button id="btnCancelOTP" class="btn btn-primary">Cancel</button>
                                            <input type="hidden" value="" id="hdnCustomerOTP" />
                                        </div>
                                        <div class="form-group mt-2">
                                            <div class="alert alert-danger errorMsgOTP">
                                                <strong>!</strong> Correct the errors
                                            </div>
                                            <div class="alert alert-info infoMsgOTP">
                                                <strong>!</strong> OTP have sent your mobile number. Please click here to <a href="#" onclick="sendSMS()">resend</a> if you haven't received.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container" id="divBooking">
                                <div class="row">
                                    <div class="col-6 col-md-4">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="bookingMobileNumber" disabled placeholder="Mobile">
                                            <label for="floatingInput">Mobile</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4 d-none d-md-block">
                                        <div class="form-floating">
                                            <select class="form-select" id="bookingACType" disabled aria-label="Floating label select example">
                                                <option value="-1">-- Select --</option>
                                                <option value="1">AC</option>
                                                <option value="2">Non AC</option>
                                            </select>
                                            <label for="floatingSelectGrid">AC Type</label>
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-4">
                                        <div class="form-floating">
                                            <input type="email" class="form-control" disabled id="bookingFare" placeholder="Fare">
                                            <label for="floatingInput">Fare</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6 col-md-4">
                                        <div class="form-floating" id="divName">
                                            <input type="text" class="form-control" id="bookingName" placeholder="Name">
                                            <label for="floatingInput">Name<span class="mandatoryFields">*</span></label>

                                        </div>
                                    </div>
                                    <div class="col-6 col-md-4">
                                        <div class="form-floating" id="divEmailID">
                                            <input type="email" class="form-control" placeholder="Email" id="bookingEmailID">
                                            <label for="floatingInput">Email<span class="mandatoryFields">*</span></label>

                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 mt-2 mt-md-0">
                                        <div class="form-floating" id="divAddress">
                                            <textarea class="form-control" placeholder="Address" id="bookingAddress"></textarea>
                                            <label for="floatingTextarea">Address</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-12 col-md-12">
                                        <div class="form-floating" id="divComments">
                                            <textarea class="form-control" placeholder="Address" id="bookingComments"></textarea>
                                            <label for="floatingTextarea">Comments</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <label>
                                        <strong>*You can pay via UPI or Cash.</strong>
                                    </label>
                                </div>
                                <div class="row mt-2">
                                    <div class="form-group mt-2">
                                        <button id="btnBooknow" class="btn btn-primary">Book now</button>
                                        <button id="btnReplan" class="btn btn-primary">Replan</button>
                                    </div>
                                    <div class="form-group mt-2 p_PaymentProcessing">
                                    </div>
                                    <div class="form-group mt-2">
                                        <div class="alert alert-danger errorMsgBooking">
                                            <strong>!</strong> Correct the errors
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="divBookingSuccess" class="container">
                                <div class="form-group">
                                    <div class="alert alert-info infoMsgSuccess">
                                        Booked successfully with the BookingID. Kindly provide your valuable feedback either in one of our social network page.
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="alert row" style="margin-left: -22px;">
                                        <img style="width: 100%;" src="/Images/feedback.png" title="Get flat 5% off make online full payment" alt="Get best offers on cab booking" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-2"></div>
                                        <div class="col-md-2" style="border: 1px solid #eaeaea; padding: 5px; text-align: center;">
                                            <a href="https://www.facebook.com/utaxi12/?modal=admin_todo_tour" class="clsbookNow">
                                                <img style="width: 100%;" src="/Images/Social media Icon/facebook-icon-png-social-media-icons.png" title="Best Deals on Airport Round Trip Booking follow us on Facebook" alt="get best offers fro Airport Round Trip" />
                                            </a>
                                        </div>
                                        <div class="col-md-1"></div>
                                        <div class="col-md-2" style="border: 1px solid #eaeaea; padding: 5px; text-align: center;">
                                            <a href="https://twitter.com/Utaxi3">
                                                <img style="width: 100%;" src="/Images/Social media Icon/twitter--social-media-icons-.png" title="Best Deals on Airport Round Trip follow us on Twitter" alt="see utaxi daily updates" />
                                            </a>
                                        </div>
                                        <div class="col-md-1"></div>
                                        <div class="col-md-2" style="border: 1px solid #eaeaea; padding: 5px; text-align: center;">
                                            <a href="https://www.google.co.in/search?q=utaxi&oq=utaxi&aqs=chrome..69i57j69i60j35i39j69i61l3.6428j1j7&sourceid=chrome&ie=UTF-8#lrd=0x3bae151ddb3b9c3b:0x453bb66e876199fc,3,,,">
                                                <img style="width: 100%;" src="/Images/Social media Icon/21-social-media-icons.png" alt="roundtrip taxi from btm layput to airport" />
                                            </a>
                                        </div>
                                        <div class="col-md-2"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    Click <a href="#" class="clsbookNow">here</a> for another booking
                                </div>
                            </div>
                        </div>
                        <div class="card-footer"></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card classPackage mb-6 clsAiportRoundTripSet0">
                        <div class="card-header boldfields">
                            Gallery
                        </div>
                        <div class="card-body">
                            <div id="carouselExampleIndicatorsAirportRoundTrip" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicatorsAirportRoundTrip" data-slide-to="0" class="active"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="/Images/Airport-Round-trip/from-bangalore-Airport-Round-trip.png" alt="Online Car Rental from Bangalore to Bangalore Airport" title="Hire taxi for full day from Bangalore to Bangalore Airport" />
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicatorsAirportRoundTrip" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicatorsAirportRoundTrip" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                            <div class="col-md-8">
                                <div class="card">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-md-2">
                                </div>
                                <div class="col-md-5 cabName" style="text-align: left;">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="margin: 5px 0px; width: 100%;">
                <div class="col-md-12 clsAiportRoundTripSet0">
                    <div class="card classPackage mb-12">
                        <div class="card-header boldfields">
                            About the trip
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Airport round trip for the time of <b>12:00 AM - 11:59 PM</b> would cost <b>Rs.1220</b> for <b>Indica Non/AC</b>
                                </li>
                                <li class="list-group-item">Extra Charge for Luggage would be Rs.30 extra
                                </li>
                                <li class="list-group-item">Extra hour would cost Rs.100 extra
                                </li>
                                <li class="list-group-item">Sedan cars would cost Rs.200 extra
                                </li>
                                <li class="list-group-item">A/C charges would cost Rs.150 extra
                                </li>
                                <li class="list-group-item">
                                    <b>Off Toll road Service</b>
                                </li>
                                <li class="list-group-item">
                                    <b>No parking charges and including one hour waiting</b>
                                </li>
                                <li class="list-group-item">
                                    <b>Applicable for limited areas</b>
                                </li>
                            </ul>
                        </div>
                        <div class="card-footer">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card classPackage mb-3">

                    <div class="card-body">

                        <h5>Outstation Taxi Service in Bangalore</h5>
                        <p>If you are looking for an outstation trip from Bangalore for a family weekend gateway, office trip or even business travel, Bangalore gives you lot of options, for 2-3 days or even for week long trips. This can be temple tours, weekend getaways to hill stations, trekking places, forests, beautiful waterfalls, or heritage places.</p>

                        <p>Visiting to these places with family or friends is best done by availing <a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Outstation taxi services in Bangalore.</a> Going for for bangalore outstation cabs helps you easily spend time with family and friends and let the experienced driver manage the driving part.</p>

                        <h5>Outstation Cabs from Bangalore</h5>
                        <p>When you want to travel outstation and look for cab service, there are many things to keep in mind, such as type of vehicle, driver experience and knowledge of the route, agency background, rates, ease of booking, refunds, cancellations. It is not just about choosing less rates but also quality and service matters. Utaxi is developed to serve you this.</p>

                        <p>To ease this hassle of comparing with tens of operators and not knowing exactly which operator to rely, Utaxi helps by verifying Bangalore operators and getting real time prices from them. At Utaxi, by submitting trip request, you will get up to 10 quotes with operator ratings and prices and vehicle models, so you can easily choose. This way Utaxi makes your booking most easy and get you cabs at best rates.</p>


                        <h5>Distance and time from Bangalore to major cities</h5>
                        <p>Bengaluru (Bangalore) is situated close to the most beautiful cities in Karnataka which includes Nandi Hills, Mysore, Coorg, Chennai, Wayanad, Chikmagalur, and Pondicherry. If you want to have a weekend getaway to any of these places, then hiring outstation cabs in Bangalore is the most appropriate mode of travel as you can reach your destination in optimal time.</p>

                        <p>The below table highlights the major cities near Bangalore and approximate time to reach.</p>


                        <%--                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Destination</th>
                                    <th>Distance from Bangalore</th>
                                    <th>Time required to reach </th>
                                    <th>Book Taxi</th>
                                </tr>
                                <tr>
                                    <td>Bangalore to Mysore</td>
                                    <td>143 kms </td>
                                    <td>3 hrs 30 mns</td>
                                    <td><a href="https://www.utaxi.in/cheapestholidaypackage/weekendgetaway/mysore1daypackage/bestplaceinmysore">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Coorg</td>
                                    <td>237 kms </td>
                                    <td>5 hrs 30 mns</td>
                                    <td><a href="https://www.utaxi.in/cheapestholidaypackage/weekendgetaway/coorgpackagetour/bestplaceincoorg">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Nandi Hills</td>
                                    <td>60 kms </td>
                                    <td>1 hrs 15 mns</td>
                                    <td><a href="https://www.utaxi.in/cheapestholidaypackage/weekendgetaway/Nandihillspackage/bestplaceinnandihills">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Ooty</td>
                                    <td>270 kms </td>
                                    <td>6 hrs </td>
                                    <td><a href="https://www.utaxi.in/cheapestholidaypackage/weekendgetaway/OotyandcoonoorPackageTour/bestplaceinOotyandCoonoor">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Wayanad</td>
                                    <td>277 kms </td>
                                    <td>6 hrs 30 mns</td>
                                    <td><a href="https://www.utaxi.in/cheapestholidaypackage/weekendgetaway/Wayanadpackagetour/bestplaceinWayanad">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Tirupati</td>
                                    <td>250 kms </td>
                                    <td>6 hrs </td>
                                    <td><a href="https://www.utaxi.in/cheapestholidaypackage/weekendgetaway/ChikkatirupathiandKotilingeshwaraPackage/bestplaceinChikkaThirupatiandkotilingeshwara">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Talakadu</td>
                                    <td>242 kms </td>
                                    <td>5 hrs 40 mns</td>
                                    <td><a href="https://www.utaxi.in/cheapestholidaypackage/weekendgetaway/shivanasamudrawaterfallspackagetour/bestplaceinshivanasamudrawaterfalls">Book Now</a></td>
                                </tr>
                            </tbody>
                        </table>--%>



                        <li class="list-group-item">
                            <b>Driver Food &amp; Stay -</b>
                            Although we dont ask our Customer's to pay for our Drivers Food &amp; Stay, for the cab etc are part of the trip and not considered seperately.
                    when you stay at Hotels/Resorts/Home Stays or atleast give them time to find out themselves. Driver spending time for his food, filling fuel
                    but atleast ensure they are given enough time to take care of themselves. Drivers should get access to basic amenities to get fresh etc,

                        </li>

                        <br>
                        <h5>Outstation taxi prices from Bangalore</h5>
                        <p>With Utaxi you can get the best prices for outstation cabs in Bangalore online with our completely transparent pricing policy. Our inventory includes the leading verified operators for outstation cabs in Bangalore along with details of the vehicle,driver etc.</p>

                        <p>With us, you can compare prices with ease, as we share the exact fare for outstation cabs with transparent billing. Here are few of the cabs for outstation trips in Bangalore based on their price and capacity.</p>

                        <%--                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th style="width: 173px;">Vehicle Type</th>

                                    <th style="width: 206px;">Vehicle Models
                                        <br>
                                    </th>
                                    <th>No passengers Can Travel</th>
                                    <th style="width: 170px;">Price/KM AC </th>
                                    <th>Min KM Per Day</th>
                                    <th>Driver Bata/Day
                                        <br>
                                        (Time 6.00 AM to 9.59 PM)
                                    </th>
                                    <th>Night Driver Bata/Day
                                        <br>
                                        (Time 10.00 PM to 5.59 AM)
                                    </th>
                                </tr>

                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Hatchback NON AC</a></td>

                                    <td>Indica,Ritz, Etios Liva</td>
                                    <td>4 passengers</td>
                                    <td>₹ 8.00/- Per Km NON AC</td>
                                    <td>250 Kms</td>
                                    <td>₹ 250/- </td>
                                    <td>₹ 250/- </td>

                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Hatchback AC</a></td>

                                    <td>Indica,Ritz, Etios Liva</td>
                                    <td>4 passengers</td>
                                    <td>₹ 8.50/- Per Km AC</td>
                                    <td>250 Kms</td>
                                    <td>₹ 250/-</td>
                                    <td>₹ 250/-</td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Sedan</a></td>
                                    <td>Etios, DZire, Verito</td>
                                    <td>4 passengers</td>
                                    <td>₹ 9.50/-  Per Km AC</td>
                                    <td>250 Kms</td>
                                    <td>₹ 250/-</td>
                                    <td>₹ 250/-</td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Prime Sedan</a></td>
                                    <td>Ciaz,Nissan Sunny, Honda City</td>
                                    <td>4 passengers</td>
                                    <td>₹ 10.50/- Per Km AC</td>
                                    <td>250 Kms</td>
                                    <td>₹ 250/-</td>
                                    <td>₹ 250/-</td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">SUV</a></td>
                                    <td>Innova, Crysta, Xylo</td>
                                    <td>6 passengers</td>
                                    <td>₹ 12.50/- Per Km AC</td>
                                    <td>250 Kms</td>
                                    <td>₹300/-</td>
                                    <td>₹300/-</td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">SUV</a></td>
                                    <td>Innova, Crysta, Xylo</td>
                                    <td>7 passengers</td>
                                    <td>₹ 13.00/- Per Km AC</td>
                                    <td>250 Kms</td>
                                    <td>₹300/-</td>
                                    <td>₹300/-</td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Tempo Traveller NON AC</a></td>
                                    <td>Force Motors, Mazda</td>
                                    <td>12 passengers</td>
                                    <td>₹14.00/- Per Km NON AC</td>
                                    <td>300 Kms</td>
                                    <td>₹ 350/- </td>
                                    <td>₹ 350/- </td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Tempo Traveller AC</a></td>
                                    <td>Force Motors, Mazda</td>
                                    <td>12 passengers</td>
                                    <td>₹16.00/- Per Km NON AC</td>
                                    <td>300 Kms</td>
                                    <td>₹ 350/- </td>
                                    <td>₹ 350/- </td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Mini Bus NON AC</a></td>
                                    <td>Swaraj mazda</td>
                                    <td>22 passengers</td>
                                    <td>₹ 22.00/- Per Km NON AC</td>
                                    <td>350 Kms</td>
                                    <td>₹ 450/-</td>
                                    <td>₹ 450/-</td>
                                </tr>
                                <tr>
                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Mini Bus AC</a></td>
                                    <td>Swaraj mazda</td>
                                    <td>22 passengers</td>
                                    <td>₹ 26.00/- Per Km AC</td>
                                    <td>350 Kms</td>
                                    <td>₹ 450/-</td>
                                    <td>₹ 450/-</td>
                                </tr>
                            </tbody>
                        </table>--%>
                        <br>
                        <h5>Why book outstation cabs in Bangalore with Utaxi?</h5>
                        <p>To book an outstation taxi service in Bangalore online, the most important thing to do is compare prices online! With so many new outstation taxi services in Bangalore hitting the market, you can easily end up paying more than your budget.</p>

                        <p>Utaxi is your one-stop destination to find the best cab operators/cab rental agencies for outstation taxis in Bangalore, compare the best prices and book your cab online.</p>

                        <p>This way you can compare and choose the best vehicle at affordable prices from local operators or agencies. Utaxi is the top site in India for comparing outstation taxi prices in Bangalore and booking outstation cabs in Bangalore online.</p>
                        <%--<table id="customers">
                            <tbody>
                                <tr>
                                    <th>Bangalore Airport Services</th>
                                    <th>Book</th>

                                </tr>
                                <tr>
                                    <td>Bangalore Airport Pickup</td>

                                    <td><a href="https://www.utaxi.in/bangalore/airport-taxi/airport-pickup.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore Airport Drop</td>

                                    <td><a href="https://www.utaxi.in/bangalore/airport-taxi/airport-drop.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore  Airport Round Pickup</td>

                                    <td><a href="https://www.utaxi.in/bangalore/airport-taxi/airport-round-trip.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore Cab for Outstation</td>

                                    <td><a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore Taxi Services</td>

                                    <td><a href="https://www.utaxi.in/">Book Now</a></td>
                                </tr>

                            </tbody>
                        </table>--%>
                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" id="hdnWebApiURL" value='https://webapis.utaxi.in/Web/' />
    </main>
</asp:Content>
