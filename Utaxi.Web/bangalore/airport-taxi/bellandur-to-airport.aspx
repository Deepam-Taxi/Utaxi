<%@ Page Title="" Language="C#" MasterPageFile="~/bangalore/airport-taxi/aiportMaster.Master" AutoEventWireup="true" CodeBehind="AirportSamplePage.aspx.cs" Inherits="Utaxi.Web.bangalore.airport_taxi.AirportSamplePage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Book Taxi  from Airport from Bellandur to Airport Pickup Rs 474/-
    </title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main role="main" class="container">


        <div class="row" style="margin-top: 5px;">
             <div class="col-md-6">
     <div class="card border-dark mb-3">
    
            <div class="card-body">
                <div class="container" id="divSearchRides">
                    <div class="form-group well" style="text-align: center;" id="airportPickupOptions">
                        <label class="form-check-inline">
                            <input type="radio" class="form-check-input" name="pickupOption" id="rdAirportPickup" disabled value="1">Airport Pickup
                        </label>
                        <label class="form-check-inline">
                            <input type="radio" class="form-check-input" name="pickupOption" id="rdAirportDrop" disabled checked value="2">Airport Drop
                        </label>
                        <label class="form-check-inline">
                            <input type="radio" class="form-check-input" name="pickupOption" id="rdAirportRT" disabled value="3">Airport Round trip
                        </label>
                    </div>
                    <div class="form-group well" style="text-align: center;" id="outstationOptions">
                        <label class="form-check-inline">
                            <input type="radio" class="form-check-input" name="outstationOption" id="rdOutstationTrip" checked value="">One way
                        </label>
                        <label class="form-check-inline">
                            <input type="radio" class="form-check-input" name="outstationOption" id="rdOutstationPackage" value="">Two way
                        </label>
                    </div>
                    <div class="form-group mt-2" id="divPickup">
                        <label for="pickupPlace" class="boldFields">Pickup place<span class="mandatoryFields">*</span></label>
                       
                        <input type="text" class="form-control" value="Bellandur, Bengaluru, Karnataka" placeholder="Bellandur, Bengaluru, Karnataka" readonly id="pickupPlaceSearch">
                       
                    </div>
                    <div class="form-group mt-2" id="divAiportPickupField">
                        <label for="dropPlace" class="boldFields">Airport Pickup<span class="mandatoryFields">*</span></label>
                        <input type="text" class="form-control" value="Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India" placeholder="Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India" disabled id="pickupPlaceAirportSearch">
                    </div>
                    <div class="form-group" id="divDrop">
                        <label for="dropPlace" class="boldFields">Drop place<span class="mandatoryFields">*</span></label>
                      
                        <input type="text" class="form-control" value="Bellandur, Bengaluru, Karnataka" placeholder="Bellandur, Bengaluru, Karnataka" readonly id="dropPlaceSearch">
                      
                    </div>
                    <div class="form-group" id="divAiportDropField">
                        <label for="dropPlace" class="boldFields">Airport Drop<span class="mandatoryFields">*</span></label>
                        <input type="text" class="form-control" value="Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India" placeholder="Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India" disabled id="dropPlaceAirportSearch">
                    </div>
                    <div class="form-group" id="divPackageType">
                        <label for="PackageType" class="boldFields">Package Type<span class="mandatoryFields">*</span></label>
                        <select name="ddlPackageType" id="ddlPackageType" class="form-control"></select>
                    </div>
                    <div class="form-group" id="divPickupTime">
                            <label for="pickupdatetime" class="boldFields">Pickup Date & Time<span class="mandatoryFields">*</span></label>
                            <div class="row">
                                <div class="col-md-5">
                                    <div class='input-group date'>
                                        <input type='text' class="form-control" id="pickupdatepicker" placeholder="mm/dd/yyyy" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="pickuptimepicker" placeholder="hh:mm AM/PM">
                                </div>
                                <div class="col-md-3">
                                </div>
                            </div>
                        </div>
                        <div class="form-group" id="divDropTime">
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
                    <div class="form-group" id="btnSearchNext">
                        <button id="btnSubmit" class="btn btn-primary">Search Rides</button>
                        <input type="hidden" value="" id="hdnServiceNameID" />
                        <input type="hidden" value="" id="hdnServiceTypeID" />
                        <input type="hidden" value="" id="hdnStatusID" />
                        <input type="hidden" value="564" id="hdndropPlaceID" />
                        <input type="hidden" value="22289" id="hdnpickupPlaceID" />
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


                        <input type="hidden" id="hdnPackageType" />
                        <input type="hidden" id="hdnAirportServiceNameID"  />
                        <input type="hidden" id="hdnPackageRateID"  />
                        <input type="hidden" id="hdnPackageACTypeID"  />
                        <input type="hidden" id="hdnPackageFare" />
                      
                    </div>
                    <div class="form-group">
                        <div class="alert alert-danger errorMsg">
                            <strong>!</strong> Correct the errors
                        </div>
                    </div>
                </div>
                <div id="divloadMap"></div>
                <div class="container" id="divAvailableRides">
                    <div class="card" style="background-color: #fdc922;">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-md-6">
                                    Airport Drop
                                </div>
                                <div class="col-md-5" style="margin-left: 27px;">
                                    <button type="button" class="btn btn-primary bookingHeader">
                                        Non AC
                                    </button>
                                    <button type="button" class="btn btn-success bookingHeader">
                                        AC
                                    </button>
                                </div>
                                <div class="col-md-1">
                                </div>
                            </div>
                        </div>
                        <div class="card-body" style="background-color: #ffffff;">
                            <ul class="list-group list-group-flush ratelistAirportPickup"></ul>
                        </div>
                    </div>
                    <br />
                </div>
                <div class="container" id="divOTPVerification">
                    <div class="card">
                        <div class="card-header">
                            OTP verification
                        </div>
                        <div class="card-body">
                            <div class="form-group" id="divMobileNumber">
                                <label for="mobileNumber" class="boldFields">Mobile number<span class="mandatoryFields">*</span></label>
                                <input type="text" class="form-control numberOnly" id="mobileNumber" maxlength="10">
                            </div>
                            <div class="form-group" id="divOTP">
                                <label for="OTP" class="boldFields">OTP<span class="mandatoryFields">*</span></label>
                                <input type="text" class="form-control numberOnly" id="OTP">
                            </div>
                            <div class="form-group">
                                <button id="btnSubmitOTP" class="btn btn-primary">Next</button>
                                <button id="btnCancelOTP" class="btn btn-primary">Cancel</button>
                                <input type="hidden" value="" id="hdnCustomerOTP" />
                            </div>
                            <div class="form-group">
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
                        <div class="col-md-6">
                            <div class="form-group" id="divName">
                                <label for="bookingName" class="boldFields">Name<span class="mandatoryFields">*</span></label>
                                <input type="text" class="form-control" id="bookingName">
                            </div>
                            <div class="form-group" id="divMobileno">
                                <label for="bookingMobileNumber" class="boldFields">Mobile no<span class="mandatoryFields">*</span></label>
                                <input type="text" class="form-control" disabled id="bookingMobileNumber" maxlength="10">
                            </div>
                            <div class="form-group" id="divEmailID">
                                <label for="bookingEmailID" class="boldFields">EmailID<span class="mandatoryFields">*</span></label>
                                <input type="email" class="form-control" id="bookingEmailID">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" id="divACType">
                                <label for="bookingACType" class="boldFields">AC Type<span class="mandatoryFields">*</span></label>
                                <select class="form-control" id="bookingACType" disabled style="height: 33px;">
                                    <option value="-1">-- Select --</option>
                                    <option value="1">AC</option>
                                    <option value="2">Non AC</option>
                                </select>
                            </div>
                            <div class="form-group" id="divFare">
                                <label for="bookingFare" class="boldFields">Fare</label>
                                <input type="text" class="form-control" disabled id="bookingFare">
                            </div>
                            <div class="form-group" id="divAddress">
                                <label for="bookingAddress" class="boldFields">Address<span class="mandatoryFields">*</span></label>
                                <textarea id="bookingAddress" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" id="divComments">
                        <label for="bookingComments" class="boldFields">Comments</label>
                        <textarea id="bookingComments" class="form-control"></textarea>
                    </div>
                    <div class="form-group well" id="paymentOption">
                        <div id="RdlOnlinePay">
                            <label class="form-check">
                                <input type="radio" class="form-check-input" name="bookingPayOption" id="rdPay100percent" value="1">Pay now - get <span class="badge badge-pill badge-info">5% discount </span>
                            </label>
                            <label class="form-check">
                                <input type="radio" class="form-check-input" name="bookingPayOption" id="rdPay50percent" value="2">Pay 50% now - get <span class="badge badge-pill badge-info">2.5% discount </span>
                            </label>
                        </div>
                        <label class="form-check">
                            <input type="radio" class="form-check-input" name="bookingPayOption" id="rdPayLater" value="5">I want to Pay later
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="p_TripFare" class="p_TripFare p_T"></label><br />
                        <label for="p_Discount" class="p_Discount p_T"></label><br />
                        <label for="p_Balance" class="p_Balance p_T"></label>
                    </div>
                    <div class="form-group">
                        <button id="btnBooknow" class="btn btn-primary">Book now</button>
                        <button id="btnReplan" class="btn btn-primary">Replan</button>
                    </div>
                    <div class="form-group p_PaymentProcessing">

                    </div>
                    <div class="form-group">
                        <div class="alert alert-danger errorMsgBooking">
                            <strong>!</strong> Correct the errors
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
                            <img style="width: 100%;" src="~/Images/feedback.png" alt="bangalore airport to btm layout" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-2" style="border: 1px solid #eaeaea; padding: 5px; text-align: center;">
                                <a href="https://www.facebook.com/utaxi12/?modal=admin_todo_tour" class="clsbookNow">
                                    <img style="width: 100%;" src="~/Images/Social media Icon/facebook-icon-png-social-media-icons.png" alt="btm layout to devanahalli airport" />
                                </a>
                            </div>
                            <div class="col-md-1"></div>
                            <div class="col-md-2" style="border: 1px solid #eaeaea; padding: 5px; text-align: center;">
                                <a href="https://twitter.com/Utaxi3">
                                    <img style="width: 100%;" src="~/Images/Social media Icon/twitter--social-media-icons-.png" alt="airport transfer" />
                                </a>
                            </div>
                            <div class="col-md-1"></div>
                            <div class="col-md-2" style="border: 1px solid #eaeaea; padding: 5px; text-align: center;">
                                <a href="https://www.google.co.in/search?q=utaxi&oq=utaxi&aqs=chrome..69i57j69i60j35i39j69i61l3.6428j1j7&sourceid=chrome&ie=UTF-8#lrd=0x3bae151ddb3b9c3b:0x453bb66e876199fc,3,,,">
                                    <img style="width: 100%;" src="~/Images/Social media Icon/google-plus-3-169 (1).png" alt="btm layout water tank bus stop to bangalore airport" />
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
         </div>
     
    </div>
            <div class="col-md-6">
            
               
                <div class="card">
                    <h2 style="padding: 13px; font-size: 23px;">Airport Pickup Services from Bellandur</h2>
                    <div class="card-body" style="margin-top: -30px;">
                        <table style="width: 100%">
                             <tr>
                                <td><a href="https://www.utaxi.in/bangalore/airport-taxi/hsr-layout-to-airport.aspx">HSR Layout  </a></td>
                                      <td><a href="https://www.utaxi.in/bangalore/airport-taxi/agara-to-airport.aspx">Agara </a></td>
                            </tr>
                                <tr>
                        
                                <td><a href="https://www.utaxi.in/bangalore/airport-taxi/bellandur-to-airport.aspx">Bellandur </a></td>
                                      <td><a href="https://www.utaxi.in/bangalore/airport-taxi/bda-complex-hsr-layout-to-airport.aspx">BDA Complex HSR Layout   </a></td>
                            </tr>
                               <tr>
                                <td><a href="https://www.utaxi.in/bangalore/airport-taxi/muneshwara-nagar-to-airport.aspx">Muneshwara Nagar  </a></td>
                                <td><a href="https://www.utaxi.in/bangalore/airport-taxi/mangammanapalya-to-airport.aspx">Mangammanapalya  </a></td>
                            </tr>
                               <tr>
                                <td><a href="https://www.utaxi.in/bangalore/airport-taxi/parangipalya-to-airport.aspx">Parangipalya </a></td>
                                <td><a href="https://www.utaxi.in/bangalore/airport-taxi/somasundarapalya-to-airport.aspx">Somasundarapalya </a></td>
                            </tr>
                              
                           
                           
                        </table>
                    </div>
                </div>
                <br />
                 
            
            </div>

  

            <div class="col-md-12">
                   <div class="card">
                    <h1 style="padding: 13px; font-size: 26px;">Book Cabs from Bellandur</h1>
                    <div class="card-body" style="margin-top: -30px;">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <b>Cab services from Bellandur -</b>
                                U Taxi  Provides Best and affordable cheap cabs service in and around from Bellandur. We have excellent cab monitoring systems that keep the liability of the cars and well trained, professional drivers.


                            </li>
                            <li class="list-group-item">Book a U Taxi from Bangalore, We will ensure that you get picked up from any corner of the city at your doorstep. We assure you a premium experience at the most affordable and cheaper rates compared to other taxi services in Bangalore</li>

                        </ul>
                    </div>
                </div>
                <div class="card">
                    <h4 style="padding: 16px; font-size: 18px; margin-bottom: -25px;">Book Cab HatchBack INR 8/km non Ac and 8.5/km AC</h4>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">

                            <p>
                                INR 8 and 8.5 for one way and round trip for ac and non ac respectively. Our Hatchback vehicles are Tata Indica, Maruti Swift, Maruti Ritz, Toyota Etios Liva.
                        Hatchback vehicles are 4+1 seater and can accommodate 2 bags of luggage maximum. Our Vehicles can be used for both Airport taxi and outstation cabs rentals
                        and Per day 250 average km/250 Driver Bata
                            </p>

                        </ul>
                    </div>

                </div>
                <div class="card">
                    <h4 style="padding: 16px; font-size: 18px; margin-bottom: -25px;">Book Sedan Cab Rs.9/km non Ac and Rs 9.5/km AC </h4>
                    <div class="card-body">
                        <p>
                            Per day 250 average km/250 Driver Bata
                    INR 9 and 9.5 for one way and  for round trip for ac and non ac respectively. Our Sedan Vehicles are Maruti Swift Dzire, Renault Logan, Toyota Etios, Mahindra Verito. Sedan models also come with 4+1 seater which has boot space to accommodate 5 bags. Our vehicles used for both outstation vehicles rentals and Bengaluru airport taxi/cabs.

                        </p>
                    </div>
                </div>
                <div class="card">
                    <h4 style="padding: 16px; font-size: 18px; margin-bottom: -25px;">Book SUV Cab Rs.12.5/km Ac for 6 seater and Rs 13/km Ac for 7 seater </h4>
                    <div class="card-body">
                        <p>
                            Per day 250 average km/300 Driver Bata no any cab service will provide in this cheaper rates and also for average 250kms/day
                    Our SUV Vehicles Toyota Innova, , Mahindra Xylo, Chevrolet Enjoy are the SUV models which has a seating capacity of 6+1/7+1 and luggage space for 6 suitcase or trolleys and also available with top carriers top of the vehicle. Ideal for Family / Small group Rentals.

                        </p>
                    </div>
                </div>
                <div class="card">
                    <h4 style="padding: 16px; font-size: 18px; margin-bottom: -25px;">Book Tempo Traveller Rs.14/km Non AC and Rs.16/km AC</h4>
                    <div class="card-body">
                        <p>
                            Per day 300 average km/350 Driver Bata
                    If you are a bigger group we have Tempo Traveller vehicles 12+1 Seater which can easily accommodate 12 people and enough luggage on top and back of the vehicle. Since these vehicles are 4 wheel drive they are ideal for hill station trips, trekking groups & camping.


                        </p>
                    </div>
                </div>
                <div class="card">
                    <h4 style="padding: 16px; font-size: 18px; margin-bottom: -25px;">Customer Support 24/7 Taxi Services</h4>
                    <div class="card-body">
                        <p>
                            Our customer support team works 24/7 for  365 days to ensure door to door pickup and drop from all parts of Banashankari to Bengaluru International Airport our drivers will reach you safely as per your convenient time to catch your domestic or international flight.

                        </p>
                    </div>
                </div>

            </div>
            <div class="col-md-12">
                <div class="card classPackage mb-3">

                    <div class="card-body">

                        <h2>Outstation Taxi Service in Bangalore</h2>
                        <p>If you are looking for an outstation trip from Bangalore for a family weekend gateway, office trip or even business travel, Bangalore gives you lot of options, for 2-3 days or even for week long trips. This can be temple tours, weekend getaways to hill stations, trekking places, forests, beautiful waterfalls, or heritage places.</p>

                        <p>Visiting to these places with family or friends is best done by availing <a href="https://www.utaxi.in/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx">Outstation taxi services in Bangalore.</a> Going for for bangalore outstation cabs helps you easily spend time with family and friends and let the experienced driver manage the driving part.</p>

                        <h5>Outstation Cabs from Bangalore</h5>
                        <p>When you want to travel outstation and look for cab service, there are many things to keep in mind, such as type of vehicle, driver experience and knowledge of the route, agency background, rates, ease of booking, refunds, cancellations. It is not just about choosing less rates but also quality and service matters. Utaxi is developed to serve you this.</p>

                        <p>To ease this hassle of comparing with tens of operators and not knowing exactly which operator to rely, Utaxi helps by verifying Bangalore operators and getting real time prices from them. At Utaxi, by submitting trip request, you will get up to 10 quotes with operator ratings and prices and vehicle models, so you can easily choose. This way Utaxi makes your booking most easy and get you cabs at best rates.</p>


                        <h5>Distance and time from Bangalore to major cities</h5>
                        <p>Bengaluru (Bangalore) is situated close to the most beautiful cities in Karnataka which includes Nandi Hills, Mysore, Coorg, Chennai, Wayanad, Chikmagalur, and Pondicherry. If you want to have a weekend getaway to any of these places, then hiring outstation cabs in Bangalore is the most appropriate mode of travel as you can reach your destination in optimal time.</p>

                        <p>The below table highlights the major cities near Bangalore and approximate time to reach.</p>


                        <table id="customers">
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
                                    <td><a href="https://www.utaxi.in/holiday-package-taxi-services/bangalore-to-mysore-one-day-tour-package.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Coorg</td>
                                    <td>237 kms </td>
                                    <td>5 hrs 30 mns</td>
                                    <td><a href="https://www.utaxi.in/holiday-package-taxi-services/bangalore-to-coorg-tour-package-for-1-night-2-days.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Nandi Hills</td>
                                    <td>60 kms </td>
                                    <td>1 hrs 15 mns</td>
                                    <td><a href="https://www.utaxi.in/holiday-package-taxi-services/bangalore-to-nandi hills-one-day-sightseeing.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Ooty</td>
                                    <td>270 kms </td>
                                    <td>6 hrs </td>
                                    <td><a href="https://www.utaxi.in/holiday-package-taxi-services/coorg-ooty-conoor-2-nights-3-days-package.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Wayanad</td>
                                    <td>277 kms </td>
                                    <td>6 hrs 30 mns</td>
                                    <td><a href="https://www.utaxi.in/holiday-package-taxi-services/bangalore-to-wayanand-2-night-3-days-tour-package.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Hogenakkal</td>
                                    <td>250 kms </td>
                                    <td>6 hrs </td>
                                    <td><a href="https://www.utaxi.in/holiday-package-taxi-services/bangalore-to-hogenakkal-one-day-package.aspx">Book Now</a></td>
                                </tr>
                                <tr>
                                    <td>Bangalore to Talakadu</td>
                                    <td>242 kms </td>
                                    <td>5 hrs 40 mns</td>
                                    <td><a href="https://www.utaxi.in/holiday-package-taxi-services/bangalore-to-shivanasamudra-talakad-one-day-trip.aspx">Book Now</a></td>
                                </tr>
                            </tbody>
                        </table>



                        <li class="list-group-item">
                            <b>Driver Food &amp; Stay -</b>
                            Although we dont ask our Customer's to pay for our Drivers Food &amp; Stay, for the cab etc are part of the trip and not considered seperately.
                    when you stay at Hotels/Resorts/Home Stays or atleast give them time to find out themselves. Driver spending time for his food, filling fuel
                    but atleast ensure they are given enough time to take care of themselves. Drivers should get access to basic amenities to get fresh etc,

                        </li>

                        <br>

                        <h5><a href="https://www.utaxi.in/">Why book outstation cabs in Bangalore with Utaxi?</a></h5>
                        <p>To book an outstation taxi service in Bangalore online, the most important thing to do is compare prices online! With so many new outstation taxi services in Bangalore hitting the market, you can easily end up paying more than your budget.</p>

                        <p>Utaxi is your one-stop destination to find the best cab operators/cab rental agencies for outstation taxis in Bangalore, compare the best prices and book your cab online.</p>

                        <p>This way you can compare and choose the best vehicle at affordable prices from local operators or agencies. Utaxi is the top site in India for comparing outstation taxi prices in Bangalore and booking outstation cabs in Bangalore online.</p>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Bangalore Airport</th>
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

                                    <td><a href="https://www.utaxi.in/bangalore/airport-taxi/bangalore-airport-taxi-offers.aspx">Book Now</a></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <input type="hidden" id="hdnWebApiURL" value='https://webapis.utaxi.in/Web/' />
    </main>
</asp:Content>