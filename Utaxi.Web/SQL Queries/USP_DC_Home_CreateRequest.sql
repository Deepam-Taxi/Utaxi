USE [DeepamLive]
GO

/****** Object:  StoredProcedure [dbo].[USP_DC_Home_CreateRequest]    Script Date: 3/18/2019 3:42:41 PM ******/
DROP PROCEDURE [dbo].[USP_DC_Home_CreateRequest]
GO

/****** Object:  StoredProcedure [dbo].[USP_DC_Home_CreateRequest]    Script Date: 3/18/2019 3:42:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
--EXEC USP_DC_Home_CreateRequest @Flag =41, @ReqDateTime='07/29/2018',@Keyword ='Banaswadi-To-Airport.aspx'		
--EXEC USP_DC_Home_CreateRequest @Flag =51, @FromLocationID= 564, @ToLocationID= 953
--EXEC USP_DC_Home_CreateRequest @Flag =50, @ServiceNameID= 7, @ServiceTypeID= 1, @FromLocationID= 564, @ToLocationID= 953, @ReqDateTime= '9/24/2018', @ReqTime= '5:03 OM', @KMValue= 0
--EXEC USP_DC_Home_CreateRequest @Flag =50, @ServiceNameID= 7, @ServiceTypeID= 1, @FromLocationID= 564, @ToLocationID= 953, @ReqDateTime= '9/24/2018', @ReqTime= '5:03 OM', @KMValue= 43
-- =============================================
CREATE PROCEDURE [dbo].[USP_DC_Home_CreateRequest] 
(
	@Flag	INT = NULL ,
	@RequestID INT = NULL,
	@BookID INT = NULL,
	@RequestRefNO NVARCHAR(10) =NULL,
	@ServiceNameID INT = NULL ,
	@ServiceTypeID INT = NULL ,
	@FromLocationID INT = NULL,
	@ToLocationID INT = NULL,
	@ReqDateTime DATETIME = NULL,
	@EndDateTime DATETIME = NULL,	
	@VehTypeID  INT = NULL,
	@ReqTime	VARCHAR(30)= NULL,
	@EndTime    VARCHAR(30)= NULL,
	@RateID		INT = NULL,
	@BranchID	INT =NULL,
	@CapacityID INT =NULL,
	@AcTypeID INT =NULL,
	@PaymentTypeID INT =NULL,
	@Toll DECIMAL(18,2) =NULL,
	@Parking DECIMAL(18,2) =NULL,
	@Carrier DECIMAL(18,2) =NULL,
	@MiddlePickup DECIMAL(18,2) =NULL,	
	@PaymnetTypeID INT =NULL,
	@MinRate DECIMAL(18,2) =NULL,
	@TotalTripFare DECIMAL(18,2)=NULL,
	@PaidAmount DECIMAL(18,2) =NULL,
	@Discount DECIMAL(18,2) =NULL,
	@Balance DECIMAL(18,2) =NULL,
	@ExtraPerson DECIMAL(18,2) =NULL,
	@RouteMapID INT =NULL,
	@VehicleCapacityID INT =NULL,
	@StatusID INT =NULL,
	@DayBata DECIMAL(18,2)=NULL,
	@NightBata DECIMAL(18,2)=NULL,
	@RatePerKM DECIMAL(18,2)=NULL,
	@MinKM		DECIMAL(18,2)=NULL,
	@NoOfDays	INT =NULL,
	@NoOfNight	INT =NULL,	
	@KarCp DECIMAL(18,2)=NULL,
	@KerCp DECIMAL(18,2)=NULL,
	@TNCp DECIMAL(18,2)=NULL,
	@GoaCp DECIMAL(18,2)=NULL,
	@PondyCp DECIMAL(18,2)=NULL,
	@APCp DECIMAL(18,2)=NULL,
	@KMValue DECIMAL(18,2)=NULL,
	@KMText  NVARCHAR(15)= NULL,
    @HourID	INT	=	NULL,
    @PageID int  =	NULL,
    @Keyword NVARCHAR(500) =NULL ,
    @ErrorMessage  NVARCHAR(MAX) =NULL 
)
AS
BEGIN
	DECLARE @PayModeID INT = NULL,@RefundComments NVARCHAR(500) = NULL,
	@C_Year NVARCHAR(5)=NULL,@C_Month NVARCHAR(5)=NULL,@C_Date NVARCHAR(5)=NULL,@TotalTransaction_ NVARCHAR(5)=NULL,
	@TotalTransaction INT = NULL,@DebitAccountID INT = NULL,@AvlBalance DECIMAL(18,2) = NULL,@BookingRequestRefNO NVARCHAR(35) = NULL,
	@ToMainAreaID INT = NULL,@ServiceID INT=NULL
	
	DECLARE @ExtraKM DECIMAL(18,2) =NULL,@ExtraHour DECIMAL(18,2) =NULL
	
	IF @Flag = 1 -- To Get all the Package Types 
	BEGIN
		SELECT ID AS VALUEFIELD,ServiceType AS TEXTFIELD 
		FROM Utaxi_ServiceType
		WHERE IsActive=1 AND Type = 2
		ORDER BY DisplayOrder			
	END	
	
	ELSE IF @Flag = 2
	BEGIN
	
		SELECT * FROM DC_BookingRequest
		
		SELECT ID AS VALUEFIELD,ServiceType AS TEXTFIELD 
		FROM Utaxi_ServiceType
		WHERE IsActive=1 AND Type = 2
		ORDER BY DisplayOrder			
	END	

	ELSE IF @Flag =  3 --DC_BookingRequest
	BEGIN
		--SELECT * FROM DC_BookingRequest
		BEGIN TRY
		 BEGIN TRANSACTION 	
			
				SET @ServiceID = @ServiceTypeID			
			
			   IF EXISTS(SELECT RequestID FROM DC_BookingRequest WHERE RequestID = @RequestID )
				   BEGIN	
						SET @ServiceID = @ServiceTypeID
								  
						IF @ServiceNameID = 7 --Airport 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 17 WHEN 2 THEN 18 WHEN 3 THEN 19 ELSE 1 END)
							END
						ELSE IF @ServiceNameID = 6 --Railway Station 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 23 WHEN 2 THEN 24 WHEN 3 THEN 25 ELSE 1 END)
							END	
						ELSE IF @ServiceNameID = 5 --Railway Station 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 26 WHEN 2 THEN 27 WHEN 3 THEN 28 ELSE 1 END)
							END	
						ELSE 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 1 WHEN 3 THEN 4 ELSE @ServiceTypeID END)
							END			
					
						 IF @ServiceNameID = 3
						   BEGIN
							SELECT @NoOfDays=datediff(day, @ReqDateTime, dateadd(minute, -1, @EndDateTime)+.5),
								   @NoOfNight=datediff(day, @ReqDateTime - .5,dateadd(minute, -1, @EndDateTime)) 
						   END
						
				
						UPDATE DC_BookingRequest
						SET ServiceNameID=@ServiceNameID,ServiceTypeID=@ServiceTypeID,
						FromLocationID=@FromLocationID,ToLocationID=@ToLocationID,ReqDateTime=@ReqDateTime,ReqTime=@ReqTime,
						TripEndDate=@EndDateTime,NoOfDays=@NoOfDays,NoOfNight=@NoOfNight,ServiceID=@ServiceID
						WHERE RequestID = @RequestID
				   
						SELECT @RequestID
				   END
			   ELSE
				  BEGIN	
			
				--SET @ServiceID = @ServiceTypeID
				
				IF @ServiceNameID = 7 --Airport 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 17 WHEN 2 THEN 18 WHEN 3 THEN 19 ELSE 1 END)
					END
				ELSE IF @ServiceNameID = 6 --Railway Station 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 23 WHEN 2 THEN 24 WHEN 3 THEN 25 ELSE 1 END)
					END	
				ELSE IF @ServiceNameID = 5 --Railway Station 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 26 WHEN 2 THEN 27 WHEN 3 THEN 28 ELSE 1 END)
					END	
				ELSE 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 1 WHEN 3 THEN 4 ELSE @ServiceTypeID END)
					END			
			
				SELECT @TotalTransaction = ISNULL(COUNT(*),0)+1 
				FROM DC_BookingRequest 
				WHERE CreatedOn BETWEEN CONVERT(NVARCHAR(20),GETDATE(),101) AND CONVERT(NVARCHAR(20),GETDATE()+1,101)
				
			   SELECT @C_Year=CONVERT(VARCHAR(MAX),(( YEAR( GETDATE() ) % 100 ))),
			   @C_Month=RIGHT('00' + CAST(CONVERT(VARCHAR(MAX),(DATEPART(MM, GETDATE()))) AS VARCHAR(2)),2),
			   @C_Date=RIGHT('00' + CAST(CONVERT(VARCHAR(MAX),(DATEPART(DD, GETDATE()))) AS VARCHAR(2)),2),
			   @TotalTransaction_=RIGHT('000' + CAST(@TotalTransaction AS VARCHAR(3)), 3) 
			
			   SELECT @BookingRequestRefNO ='BR'+@C_Year+@C_Month+@C_Date+@TotalTransaction_	
			   
			   IF @ServiceNameID = 3
			   BEGIN
				SELECT @NoOfDays=datediff(day, @ReqDateTime, dateadd(minute, -1, @EndDateTime)+.5),
					   @NoOfNight=datediff(day, @ReqDateTime - .5,dateadd(minute, -1, @EndDateTime)) 
			   END
			
			   SET @VehTypeID = 1			
			   INSERT INTO DC_BookingRequest(RequestRefNO,ServiceNameID,ServiceTypeID,FromLocationID,ToLocationID,ReqDateTime,VehTypeID,ReqTime,
			   TripEndDate,NoOfDays,NoOfNight,ServiceID,ApproxKM)
			   VALUES(@BookingRequestRefNO,@ServiceNameID,@ServiceTypeID,@FromLocationID,@ToLocationID,@ReqDateTime,@VehTypeID,@ReqTime,
			   @EndDateTime,@NoOfDays,@NoOfNight,@ServiceID,CONVERT(DECIMAL(18,0),@KMValue))
			   			
			   SELECT @RequestID = @@IDENTITY	
			   
			   SELECT @RequestID
			  END  	
		 COMMIT  
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			ROLLBACK
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
			SELECT 0
		END CATCH
	END
	
	ELSE IF @Flag = 4 -- To Get all the Package Types 
	BEGIN
		SELECT TypeID AS VALUEFIELD,ServiceName AS TEXTFIELD 
		FROM Utaxi_ServiceName
		WHERE IsActive=1 
	END	
	
	ELSE IF @Flag = 5 -- To Get all the Package Types 
	BEGIN
		SELECT @ServiceNameID =ServiceNameID
		FROM DC_BookingRequest
		WHERE RequestID = @RequestID
	
		SELECT ID AS VALUEFIELD,ServiceType AS TEXTFIELD 
		FROM Utaxi_ServiceType
		WHERE IsActive=1 AND Type = @ServiceNameID
		ORDER BY DisplayOrder			
	END	
	
	ELSE IF @Flag = 6 -- View Request 
	BEGIN
		BEGIN TRY
		
			SELECT @RateID=RateID
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID
								
			SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
			R.RequestRefNO,L.AreaID AS FromLocationID,
			L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
			CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
			ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,
			ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
			ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
			ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
			R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
			ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
			(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
			(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
			(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
			(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
			(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
			(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
			ACrNAC,PaymnetTypeID,	
			ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
			ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
			ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
			RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
			(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
			ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
			ISNULL(RS.RatePerKM_AC,0) AS RatePerKM_AC,ISNULL(RS.RatePerKM_NAC,0) AS RatePerKM_NAC,
			RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
			R.NoOfDays,R.NoOfNight
			FROM DC_BookingRequest R 
			INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
			INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
			INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
			INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
			LEFT JOIN UT_Rate RS ON RS.RateID = @RateID
			LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
			LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
			WHERE R.RequestID = @RequestID
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END	
	
	ELSE IF @Flag = 7 -- Choose Payment Mode
	BEGIN
		BEGIN TRY
			SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
			R.RequestRefNO,L.AreaID AS FromLocationID,
			L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
			CONVERT(NVARCHAR(20),R.ReqDateTime,105) AS ReqDate,R.ReqTime 
			FROM DC_BookingRequest R 
			INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
			INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
			INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
			INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID
			WHERE R.RequestID = @RequestID
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END
	
	ELSE IF @Flag=8
	BEGIN
		--To Get Main Area ID 
		IF @RateID <> 0
			BEGIN
					SELECT  L.AreaID AS Source,L2.AreaID AS Destination , R.VehicleTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
					R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
					R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
					R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
					E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
					R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,R.DestinationID AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp
					FROM Utaxi_Rate R 
					INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
					INNER JOIN Utaxi_Location L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
					INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
					INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
					INNER JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
					INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
					WHERE R.IsActive=1 AND R.RateID=@RateID 
					ORDER BY VT.VName
			END	
		ELSE 
			BEGIN
			
				IF @ServiceTypeID IN (3,19,25,28)
				BEGIN
					SELECT @ServiceNameID=4,@ServiceTypeID=3
				END
				ELSE 
				BEGIN
					 SELECT @ServiceNameID=Type 
					 FROM Utaxi_ServiceType 
					 WHERE ID=@ServiceTypeID AND IsActive=1
				END
				 
				IF @ServiceNameID IN(1,5,6,7)
					BEGIN
							IF @ServiceNameID IN (5,6,7)
							BEGIN
								SELECT @ServiceTypeID = 1 
							END
							
							SELECT  L.AreaID AS Source,L2.AreaID AS Destination , R.VehicleTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
							R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
							R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
							R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
							E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
							R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp
							FROM Utaxi_Rate R 
							INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
							INNER JOIN Utaxi_Location L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
							INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
							INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
							INNER JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
							INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
							WHERE R.IsActive=1 AND R.ServiceTypeID=@ServiceTypeID  AND 
							(R.SourceID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @FromLocationID)
														
							 OR R.SourceID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @ToLocationID)) 							
							AND (R.DestinationID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @ToLocationID)
							OR  	R.DestinationID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @FromLocationID)) 
							AND  R.BranchID=@BranchID 
							--AND  R.VehicleTypeID IN (SELECT VehicleID FROM Utaxi_VehicleCapcity WHERE CapacityID=@CapacityID AND IsActive=1 AND BranchID=@BranchID )
							AND  R.VehicleTypeID IN ( SELECT VC.VehicleID 
								FROM Utaxi_VehicleCapcity  VC 
								INNER JOIN Utaxi_ServiceTypeMapping STM ON VC.VehicleID=STM.VehicleTypeID AND STM.IsActive=1
								WHERE CapacityID=@CapacityID AND VC.IsActive=1 AND VC.BranchID=@BranchID AND STM.ServiceTypeID=@ServiceTypeID )
							
							ORDER BY R.RateAC,R.RateNonAC
					END
				ELSE IF @ServiceNameID = 2
					BEGIN
							SELECT  L.AreaID AS Source,L2.AreaID AS Destination , R.VehicleTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
							R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
							R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
							R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
							E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
							R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp
							FROM Utaxi_Rate R 
							INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
							INNER JOIN Utaxi_Location L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
							INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
							INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
							INNER JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
							INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
							WHERE R.IsActive=1 AND R.ServiceTypeID=@ServiceTypeID  AND 
							(R.SourceID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @FromLocationID) OR 
							R.SourceID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @ToLocationID)) AND
							(R.DestinationID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @ToLocationID) OR 
							R.DestinationID IN (SELECT MainAreaID FROM Utaxi_Location WHERE AreaID = @FromLocationID)) AND  R.BranchID=@BranchID 
							--AND  R.VehicleTypeID IN (SELECT VehicleID FROM Utaxi_VehicleCapcity WHERE CapacityID=@CapacityID AND IsActive=1 AND BranchID=@BranchID )
							--ORDER BY VT.VName
							AND  R.VehicleTypeID IN ( SELECT VC.VehicleID 
								FROM Utaxi_VehicleCapcity  VC 
								INNER JOIN Utaxi_ServiceTypeMapping STM ON VC.VehicleID=STM.VehicleTypeID AND STM.IsActive=1
								WHERE CapacityID=@CapacityID AND VC.IsActive=1 AND VC.BranchID=@BranchID AND STM.ServiceTypeID=@ServiceTypeID )
							
							ORDER BY R.RateAC,R.RateNonAC
					END
				ELSE  IF @ServiceNameID = 3
					BEGIN
							SET @ToMainAreaID=(SELECT  MainAreaID FROM Utaxi_Location WHERE AreaID=@ToLocationID  AND IsActive=1 )		
 
							SELECT  L.AreaID AS Source,L2.AreaID AS Destination , R.VehicleTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
							R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
							R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
							R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
							E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
							R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp
							FROM Utaxi_Rate R  
							INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
							INNER JOIN Utaxi_Location L2 ON @ToMainAreaID=L2.AreaID AND L2.IsActive=1
							INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
							INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
							INNER JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
							INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
							WHERE R.IsActive=1 AND R.ServiceTypeID=@ServiceTypeID  AND 
							R.DestinationID =@ToMainAreaID   AND  R.BranchID=@BranchID 
							--AND  R.VehicleTypeID IN (SELECT VehicleID FROM Utaxi_VehicleCapcity WHERE CapacityID=@CapacityID AND IsActive=1 AND BranchID=@BranchID )
							--ORDER BY R.RateAC,R.RateNonAC
							AND  R.VehicleTypeID IN ( SELECT VC.VehicleID 
								FROM Utaxi_VehicleCapcity  VC 
								INNER JOIN Utaxi_ServiceTypeMapping STM ON VC.VehicleID=STM.VehicleTypeID AND STM.IsActive=1
								WHERE CapacityID=@CapacityID AND VC.IsActive=1 AND VC.BranchID=@BranchID AND STM.ServiceTypeID=@ServiceTypeID )
							
							ORDER BY R.RateAC,R.RateNonAC
					END			
				ELSE  IF @ServiceNameID = 4 --Up & Down 
					BEGIN
							SELECT @ToLocationID=MainAreaID 
							FROM Utaxi_Location 
							WHERE AreaID = @ToLocationID
							
							SELECT @FromLocationID=MainAreaID 
							FROM Utaxi_Location 
							WHERE AreaID = @FromLocationID
							
					
							SELECT  L.AreaID AS Source,L2.AreaID AS Destination , R.VehicleTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
							R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
							R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
							R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
							E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
							R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp
							FROM Utaxi_Rate R  
							INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
							INNER JOIN Utaxi_Location L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
							INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
							INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
							INNER JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
							INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
							WHERE R.IsActive=1 AND R.ServiceTypeID=@ServiceTypeID AND (R.SourceID=@FromLocationID OR R.SourceID =@ToLocationID ) 
							AND (R.DestinationID=@FromLocationID OR R.DestinationID =@ToLocationID ) AND  R.BranchID=@BranchID 
							--AND  R.VehicleTypeID IN (SELECT VehicleID FROM Utaxi_VehicleCapcity WHERE CapacityID=@CapacityID AND IsActive=1 AND BranchID=@BranchID )
							----ORDER BY VT.VName
							--ORDER BY R.RateAC,R.RateNonAC
							AND  R.VehicleTypeID IN ( SELECT VC.VehicleID 
								FROM Utaxi_VehicleCapcity  VC 
								INNER JOIN Utaxi_ServiceTypeMapping STM ON VC.VehicleID=STM.VehicleTypeID AND STM.IsActive=1
								WHERE CapacityID=@CapacityID AND VC.IsActive=1 AND VC.BranchID=@BranchID AND STM.ServiceTypeID=@ServiceTypeID )
							
							ORDER BY R.RateAC,R.RateNonAC
							
					END				
			END
		
	END

	ELSE IF @Flag = 9
	BEGIN
		BEGIN TRY
			
			--EXEC USP_DC_Home_CreateRequest 5
		--	SELECT @FromLocationID=953,@ToLocationID=565,@BranchID=81,@ServiceTypeID=18
			
			SELECT @ServiceTypeID=ServiceTypeID ,@BranchID=81
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID			
			
			SELECT (CASE VT.ID WHEN 29 THEN 'Hatchback (4+1)' WHEN 42 THEN 'Sedan (4+1)' ELSE VT.VName END) AS VehicleType,CB.CarBodyType,
			VT.VehicleBodyTypeID,R.VehicleTypeID,					
			ISNULL(R.MinKmAC,0) AS MinKMAC ,ISNULL(R.MinKmNonAC,0) AS MinKMNAC,ISNULL(R.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(R.MinKMRateNonAC,0) AS MinKMRateNAC,
			ISNULL(R.ExtKmRateAC,0) AS ExtraKMRateAC,ISNULL(R.ExtKmRateNonAC,0) AS ExtraKMRateNAC,ISNULL(R.ExtHrRateAC,0) AS ExtraHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
			R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,ISNULL(R.DayBata,0) AS DayBata,ISNULL(R.NightBata,0) AS NightBata,
			
			(CASE CP.KAR WHEN 0 THEN 0 ELSE R.KarnatakaCp END) AS KarnatakaCp,
			(CASE CP.KER WHEN 0 THEN 0 ELSE R.KeralaCP END) AS KeralaCP,
			(CASE CP.GOA WHEN 0 THEN 0 ELSE R.GoaCp END) AS GoaCp,			
			(CASE CP.TN WHEN 0 THEN 0 ELSE R.TNCp END) AS TNCp,
			(CASE CP.AP WHEN 0 THEN 0 ELSE R.APCp END) AS APCp,
			(CASE CP.PON WHEN 0 THEN 0 ELSE R.PondicherryCp END) AS PondicherryCp,
			VT.Passenger,VT.AC,VT.NonAC,
			(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
			ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
			ISNULL(R.RatePerKM_AC,0) AS RatePerKM_AC,ISNULL(R.RatePerKM_NAC,0) AS RatePerKM_NAC							
			FROM UT_Rate R 
			INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
			LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID			
			LEFT JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
			LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
			LEFT JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
			LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID
			WHERE R.IsActive = 1 AND R.ServiceTypeID = @ServiceTypeID
			ORDER BY CB.CarBodyType			
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH		
	END
	
	ELSE IF @Flag = 10 -- Payment Type 
	BEGIN
	
		SELECT @ServiceNameID =ServiceNameID
		FROM DC_BookingRequest
		WHERE RequestID = @RequestID
				
		IF @ServiceNameID IN (3)
		BEGIN
			SELECT PaymentOptionID AS VALUEFIELD,PaymentOption AS TEXTFIELD 
			FROM UT_PaymentOption
			WHERE IsActive=1 AND PaymentOptionID IN (3,4,5)
			
			SELECT PaymentOptionID AS VALUEFIELD,PaymentOption AS TEXTFIELD 
			FROM UT_PaymentOption
			WHERE IsActive=1 AND PaymentOptionID IN (6,7)		
		END
		ELSE
		BEGIN
			SELECT PaymentOptionID AS VALUEFIELD,PaymentOption AS TEXTFIELD 
			FROM UT_PaymentOption
			WHERE IsActive=1 AND PaymentOptionID IN (1,2,5)		
			
			SELECT PaymentOptionID AS VALUEFIELD,PaymentOption AS TEXTFIELD 
			FROM UT_PaymentOption
			WHERE IsActive=1 AND PaymentOptionID IN (6,7)			
		END
	END	
	
	ELSE IF @Flag = 11 -- Payment Type 
	BEGIN
		SELECT CommentID AS VALUEFIELD ,Comments AS TEXTFIELD 
		FROM Utaxi_Comments 
		WHERE IsActive=1 AND CommentID IN (7,8,4) 
	END	
	
	ELSE IF @Flag = 12 -- Choose Vehicle Type 
	BEGIN
		BEGIN TRY
		 BEGIN TRANSACTION 	
				IF EXISTS(SELECT * FROM DC_BookingRequest WHERE RequestID = @RequestID)
				BEGIN
				
					UPDATE DC_BookingRequest
					SET RateID=@RateID,ACrNAC=@AcTypeID
					WHERE RequestID = @RequestID
					
					SELECT @RequestID
				END
				ELSE
				BEGIN
					SELECT 0
				END
		 COMMIT  
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			ROLLBACK
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
			SELECT 0
		END CATCH
	END	
	
	ELSE IF @Flag = 13 -- Continue Check Out
	BEGIN
		BEGIN TRY
		 BEGIN TRANSACTION 	
				IF EXISTS(SELECT RequestID FROM DC_BookingRequest WHERE RequestID = @RequestID)
				BEGIN
									
					SELECT @RateID = RateID ,@ServiceNameID = ServiceNameID
					FROM DC_BookingRequest
					WHERE RequestID = @RequestID
					
					IF @AcTypeID = 1
					BEGIN
						SELECT @MinKM=MinKmAC,@MinRate=MinKMRateAC,@ExtraKM=ExtKmRateAC,@ExtraHour=ExtHrRateAC ,@VehTypeID = VehicleTypeID
						FROM UT_Rate 
						WHERE RateID = @RateID
					END
					ELSE
					BEGIN
						SELECT @MinKM=MinKmNonAC,@MinRate=MinKMRateNonAC,@ExtraKM=ExtKmRateNonAC,@ExtraHour=ExtHrRateNonAC,@VehTypeID = VehicleTypeID
						FROM UT_Rate 
						WHERE RateID = @RateID
					END
				
					
					IF @ServiceNameID = 3
					BEGIN
						SELECT @MinRate=(@RatePerKM * @MinKM)
					END
				
					UPDATE DC_BookingRequest
					SET ACrNAC=@AcTypeID ,Toll=@Toll,Parking=@Parking,Carrier=@Carrier,MiddlePickup=@MiddlePickup,
					MinKM=@MinKM,MinRate=@MinRate,ExtraKM=@ExtraKM,ExtraHour=@ExtraHour,PaymnetTypeID=@PaymentTypeID,
					TotalTripFare=@TotalTripFare,PaidAmount =@PaidAmount,Discount = @Discount,Balance=@Balance ,VehTypeID=@VehTypeID,
					ExtraPerson=@ExtraPerson ,DayBata=@DayBata	,NightBata=@NightBata,RatePerKM=@RatePerKM,
					KarnatakaCp=@KarCp ,KeralaCP=@KerCp	,TNCp=@TNCp,GoaCp=@GoaCp,PondicherryCp=@PondyCp,APCp=@APCp			
					WHERE RequestID = @RequestID
					SELECT @RequestID
				END
				ELSE
					BEGIN
						SELECT 0
					END
		 COMMIT  
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			ROLLBACK
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
			SELECT 0
		END CATCH
	END	
	
	ELSE IF @Flag = 14 -- View Request 
	BEGIN
		BEGIN TRY
		
			SELECT @RateID=RateID
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID
			
			--SELECT * FROM DC_BookingRequest

			SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
			R.RequestRefNO,L.AreaID AS FromLocationID,
			L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,		
			CONVERT(NVARCHAR(20),R.ReqDateTime,105)+SPACE(1)+ R.ReqTime AS ReqDate,R.ReqTime,VT.VName+SPACE(1)+ISNULL(AC.Name,'') AS VehicleType,
			ISNULL(R.MinKM,0) AS MinKM ,ISNULL(R.MinRate,0) AS MinRate,ISNULL(R.ExtraKM,0) AS ExtraKM,ISNULL(R.ExtraHour,0) AS ExtraHour,
			R.VehTypeID AS VehTypeID ,R.ServiceTypeID AS ServiceType,R.RateID,
			R.ACrNAC,R.PaymnetTypeID,R.PaymnetTypeID AS PaymentTypeID,	
			ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
			ISNULL(R.TotalTripFare	,0) AS TotalTripFare,
			ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,ISNULL(R.ExtraPerson,0) AS	ExtraPerson,
			ISNULL(R.DayBata,0) AS DayBata,ISNULL(R.NightBata,0) AS NightBata,
			R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,R.KarnatakaCp,
			CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
			R.NoOfDays,R.NoOfNight							
			FROM DC_BookingRequest R 
			INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
			INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
			INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
			INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
			LEFT JOIN Utaxi_VehicleType	VT ON R.VehTypeID = VT.ID	
			LEFT JOIN Utaxi_ACorNAC	AC ON R.ACrNAC = AC.ID		
			WHERE R.RequestID = @RequestID
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END	
	
	
	ELSE IF @Flag = 15 -- Get Rate List
	BEGIN
		BEGIN TRY
		
			--Customer 
			
			--Address
			
			--Booking
			
			--Fare
			
			--Request 
			
			--Return Value 
			
			SELECT 1
			
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END	
	
	
	ELSE IF @Flag = 16 -- Get DATEs
	BEGIN
		BEGIN TRY
		
			SELECT GETDATE() as todayTime,CONVERT(NVARCHAR(20),GETDATE(),101) AS today,convert(varchar(8), getdate(), 108) AS toTime
				
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END	
	
	
	
	ELSE IF @Flag = 17 -- Get Route Map
	BEGIN
		BEGIN TRY
		
			SELECT @RouteMapID=(CASE @RouteMapID WHEN -1 THEN NULL WHEN 0 THEN NULL ELSE @RouteMapID END)
		
			SELECT @ToLocationID=ToLocationID
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID		
			
			IF @RouteMapID IS NOT NULL
			BEGIN
				UPDATE DC_BookingRequest
				SET RouteMapID = @RouteMapID
				WHERE RequestID = @RequestID	
				
				EXEC USP_DC_Home_CreateRequest 19,@RequestID
			END
		
			SELECT  RM.RouteMapID ,
			L.AreaName,RM.RouteVia ,RM.KM,RM.HourAM,RM.HourPM,RM.MinuteAM, RM.MinutePM ,
			CONVERT(NVARCHAR(20),RM.CreatedOn,105) AS CreatedDate,
			RM.CreatedOn AS CreatedTime,DATENAME(DW,RM.CreatedOn) AS CreatedDay,DATENAME(DW,RM.ModifiedOn) AS ModifiedDay,
			CONVERT(NVARCHAR(20),RM.ModifiedOn,105) AS ModifiedDate,RM.ModifiedOn AS ModifiedTime,
			DATENAME(DW,RM.BlockedOn) AS BlockedOnDay,CONVERT(NVARCHAR(20),RM.BlockedOn,105) AS BlockedOnDate,
			RM.BlockedOn AS BlockedOnTime,DATENAME(DW,RM.UnBlockedOn) AS UnBlockedOnDay,CONVERT(NVARCHAR(20),RM.UnBlockedOn,105) AS UnBlockedOnDate,
			RM.UnBlockedOn AS UnBlockedOnTime,E.EMPName AS CreatedBy,E1.EMPName AS ModifiedBy ,E2.EMPName AS BlockedBy,E3.EMPName AS UnBlockedBy,RM.IsActive,
			STUFF((SELECT ','+L2.AreaName
			FROM Utaxi_CheckPostMapping BS
			INNER JOIN Utaxi_Location L2 ON BS.CheckPostPlaceID=L2.AreaID AND L2.IsActive=1 
			WHERE BS.IsActive=1 AND L.AreaID=BS.AreaID AND RM.RouteMapID=BS.RouteID ORDER BY BS.PositionID   FOR XML PATH('')),1,1,'') AS CheckPostPalces,
			STUFF((SELECT ','+CONVERT(NVARCHAR(20),L2.AreaID)
			FROM Utaxi_CheckPostMapping BS
			INNER JOIN Utaxi_Location L2 ON BS.CheckPostPlaceID=L2.AreaID AND L2.IsActive=1 
			WHERE BS.IsActive=1 AND L.AreaID=BS.AreaID AND RM.RouteMapID=BS.RouteID ORDER BY BS.PositionID   FOR XML PATH('')),1,1,'') AS CheckPostID
			FROM Utaxi_RouteMapping RM
			LEFT OUTER JOIN Utaxi_Location L ON RM.AreaID = L.AreaID 
			INNER JOIN Utaxi_Employee E ON RM.CreatedBy = E.EmpID
			LEFT OUTER JOIN Utaxi_Employee E1 ON RM.ModifiedBy = E1.EmpID
			LEFT OUTER JOIN Utaxi_Employee E2 ON RM.BlockedBy =E2.EmpID
			LEFT OUTER JOIN Utaxi_Employee E3 ON RM.UnblockedBy = E3.EmpID
			WHERE RM.IsActive IN (1) AND RM.AreaID = @ToLocationID AND RM.RouteMapID =ISNULL(@RouteMapID,RM.RouteMapID)
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END	
	
	
	ELSE IF @Flag =18
		BEGIN
			
			SELECT @ServiceTypeID = ServiceNameID ,@VehTypeID = VehTypeID
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID 
			
			
			
			SELECT TOP  1 @VehicleCapacityID = CapacityID
			FROM Utaxi_VehicleCapcity 
			WHERE IsActive = 1
		
			IF @ServiceTypeID IN (5)--Airport Transfer
				BEGIN
					IF @StatusID IN (1,2)
						BEGIN
							IF @VehTypeID  IN (82)--Tempo Traveller (12+1)
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1016,3) 
								END
							ELSE IF @VehTypeID  IN (73,59)--Toyota Innova (6+1),(7+1)
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,3,1019) 
								END	
							ELSE IF @VehTypeID  IN (75,74)--Tavera (8+1),Qualis (8+1)
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,3,1020) 
								END		
							ELSE IF @VehTypeID  IN (71,72,79,86)--Sadan 
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,3,1021)
								END		
							ELSE 
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,2,3)
									ORDER BY CommentID DESC
								END			
						END
					ELSE IF @StatusID IN (3)
						BEGIN							
							IF @VehTypeID IN (82)
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1016,1022,3,1018)		
									ORDER BY CommentID
								END
							ELSE IF @VehTypeID  IN (73,59)--Toyota Innova (6+1),(7+1)
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,3,1019) 
								END	
							ELSE IF @VehTypeID  IN (75,74)--Tavera (8+1),Qualis (8+1)
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,3,1020) 
								END		
							ELSE IF @VehTypeID  IN (71,72,79,86)--Sadan 
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,3,1021)
								END					
							ELSE 
								BEGIN
									SELECT Comments ,CommentID
									FROM Utaxi_Comments 
									WHERE IsActive=1 AND CommentID IN (1,4,2,3,16)		
									ORDER BY CommentID
								END		
						END	
				END
			ELSE IF @ServiceTypeID IN (1,6,7)
				BEGIN
					SELECT Comments ,CommentID
					FROM Utaxi_Comments 
					WHERE IsActive=1 AND CommentID IN (2,5)		
				END	
			ELSE IF @ServiceTypeID IN (2)--Package 
				BEGIN
					IF @VehicleCapacityID IN (1)
						BEGIN
							SELECT Comments ,CommentID
							FROM Utaxi_Comments 
							WHERE IsActive=1 AND CommentID IN (10,13,2,14,5)	
						END	
					ELSE IF @VehicleCapacityID IN (2)
						BEGIN
							SELECT Comments ,CommentID
							FROM Utaxi_Comments 
							WHERE IsActive=1 AND CommentID IN (8,7,5)	
						END		
					ELSE IF @VehicleCapacityID IN (3)
						BEGIN
							SELECT Comments ,CommentID
							FROM Utaxi_Comments 
							WHERE IsActive=1 AND CommentID IN (7,9,5)	
						END		
					ELSE IF @VehicleCapacityID IN (4)
						BEGIN
							SELECT Comments ,CommentID
							FROM Utaxi_Comments 
							WHERE IsActive=1 AND CommentID IN (7,8,5)	
						END	
				END	
			ELSE IF @ServiceTypeID IN (3) --Out Station 
				BEGIN
					IF @VehicleCapacityID IN (1)
						BEGIN
							SELECT Comments ,CommentID
							FROM Utaxi_Comments 
							WHERE IsActive=1 AND CommentID IN (10,5,14,11,12)	
						END	
					ELSE IF @VehicleCapacityID IN (2)
						BEGIN
							SELECT Comments ,CommentID
							FROM Utaxi_Comments 
							WHERE IsActive=1 AND CommentID IN (5,7,11,15)	
						END		
				END			
		END
	
	ELSE IF @Flag = 19 --Update Check post Based on route selection 
		BEGIN
			--EXEC USP_DC_Home_CreateRequest @Flag = 19,@RequestID=5196
			
			SELECT @RouteMapID=RouteMapID
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID	
			
			DECLARE @KAR INT =NULL,@KER INT =NULL,@GOA INT =NULL ,@TN INT =NULL,@AP INT =NULL,@PON INT =NULL
		
			IF EXISTS(SELECT * FROM DC_BookingRequest WHERE RequestID = @RequestID )
				BEGIN
					
					BEGIN TRY
					
					--SELECT * FROM DC_BookingRequest
					UPDATE DC_BookingRequest
					SET KarnatakaCp=NULL,KeralaCP=NULL,TNCp=NULL,GoaCp=NULL,APcp=NULL,PondicherryCp=NULL ,RouteMapID = @RouteMapID
					WHERE RequestID = @RequestID
					
					
					DELETE 
					FROM DC_Cp_Place
					WHERE RequestID = @RequestID					
					
					SELECT @KAR=ISNULL((SELECT CpMapID FROM Utaxi_CheckPostMapping WHERE RouteID = @RouteMapID AND CheckPostPlaceID = 1191 AND IsActive=1),0),
						   @KER=ISNULL((SELECT CpMapID FROM Utaxi_CheckPostMapping WHERE RouteID = @RouteMapID AND CheckPostPlaceID = 571 AND IsActive=1),0),
						   @GOA=ISNULL((SELECT CpMapID FROM Utaxi_CheckPostMapping WHERE RouteID = @RouteMapID AND CheckPostPlaceID = 557 AND IsActive=1),0),
						   @TN=ISNULL((SELECT CpMapID FROM Utaxi_CheckPostMapping WHERE RouteID = @RouteMapID AND CheckPostPlaceID = 856 AND IsActive=1),0),
						   @AP=ISNULL((SELECT CpMapID FROM Utaxi_CheckPostMapping WHERE RouteID = @RouteMapID AND CheckPostPlaceID = 985 AND IsActive=1),0),
						   @PON=ISNULL((SELECT CpMapID FROM Utaxi_CheckPostMapping WHERE RouteID = @RouteMapID AND CheckPostPlaceID = 592 AND IsActive=1),0)
					
					INSERT INTO DC_Cp_Place(RequestID,RouteMapID,KAR,KER,GOA,TN,AP,PON)
					VALUES(@RequestID,@RouteMapID,@KAR,@KER,@GOA,@TN,@AP,@PON)
					
					END TRY
				
					BEGIN CATCH
						INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
						SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
					END CATCH		
				END				
		END	
		
	ELSE IF @Flag = 20 --Payment Gate Way
		BEGIN
			--EXEC USP_DC_Home_CreateRequest 20
		
			DECLARE @UserName NVARCHAR(150)=NULL,@EmailID NVARCHAR(150)=NULL,@MobileNo VARCHAR(20)=NULL,@Fare NVARCHAR(50)=NULL,
			@API NVARCHAR(MAX)=NULL,@DataSign NVARCHAR(500)=NULL ,@TripPaidAmount NVARCHAR(20)=NULL
			
	  --  SELECT @BookID=3191--,@BranchID=81
		
			SELECT @API=PG.PGAPI,@BranchID=81
			FROM DC_PaymentGateway PG
			WHERE StatusID=1 AND SubBranchID = 4
			
			SELECT @UserName=C.Name,@MobileNo= RIGHT(CONVERT(VARCHAR,C.ContactNo,100),10)  ,@EmailID=C.Email_ID,@TripPaidAmount=CONVERT(VARCHAR(50),F.TripFarePaid)
			FROM Utaxi_BookingOrder B
			INNER JOIN Utaxi_Customer C ON B.CustID = C.CustID
			INNER JOIN Utaxi_Fare F ON B.BookID = F.BookID
			WHERE B.BookID = @BookID AND B.BranchID = @BranchID
			
			
			SELECT @API=REPLACE(@API,'#NAME#',@UserName)
			
			SELECT @API=REPLACE(@API,'#EMAILID#',@EmailID)	
		PRINT @API
			SELECT @API=REPLACE(@API,'#MOBILENO#',@MobileNo)	
			SELECT @API=REPLACE(@API,'#FARE#',@TripPaidAmount)		
		    --EXEC USP_DC_Home_CreateRequest 20
		    SELECT @DataSign =CONVERT(VARCHAR(10),@TripPaidAmount)+'|'+@EmailID+'|'+@UserName+'|'+@MobileNo
		     --SELECT @DataSign =@UserName+'|'+@EmailID+'|'+@MobileNo+'|'+CONVERT(VARCHAR(5),@Min_Amount)
			SELECT @API AS PGAPI ,@DataSign AS DataSign
		END	
		
	ELSE IF @Flag = 21 --Edit
		BEGIN
			SELECT R.RequestID,R.RequestRefNO,R.ServiceNameID,R.ServiceTypeID,R.FromLocationID,R.ToLocationID,R.ReqDateTime,R.VehTypeID,R.ReqTime,
			CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,
			R.TripEndDate,R.NoOfDays,R.NoOfNight,R.ServiceID,
			L.AreaName AS FromPlace,L1.AreaName AS ToPlace,GETDATE() as todayTime,CONVERT(NVARCHAR(20),GETDATE(),101) AS today,convert(varchar(8), getdate(), 108) AS toTime,
			(CASE R.ServiceNameID WHEN 7 THEN 'div_APT' WHEN 6 THEN 'div_Railway' WHEN 5 THEN 'div_BUS' WHEN 3 THEN 'div_OUTST' WHEN 1 THEN 'div_PTP' WHEN 2 THEN 'div_LPKG' ELSE 'div_APT' END) AS 
			ActiveDiv ,CONVERT(NVARCHAR(20),R.TripEndDate,101) AS TripEnd_Date,convert(varchar(8), R.TripEndDate, 108) AS TripEnd_Time
			FROM DC_BookingRequest R
			INNER JOIN Utaxi_Location L ON L.AreaID = R.FromLocationID
			INNER JOIN Utaxi_Location L1 ON L1.AreaID = R.ToLocationID
			WHERE RequestID = @RequestID
		END	
	
	ELSE IF @Flag = 22 -- Utaxi Rate Need to include for Deepamcabs
	BEGIN
		BEGIN TRY
			
			--EXEC USP_DC_Home_CreateRequest @Flag = 22,@RequestID=10
			--EXEC USP_DC_Home_CreateRequest @Flag = 19,@RequestID=5196
		--	SELECT @FromLocationID=953,@ToLocationID=565,@BranchID=81,@ServiceTypeID=18
			
			DECLARE @SID INT =NULL
			
			SELECT 
				@ServiceTypeID=ServiceTypeID ,@BranchID=81,@FromLocationID=L.MainAreaID,@ToLocationID=L2.MainAreaID,
				@ServiceNameID  = DR.ServiceNameID,@SID=ServiceTypeID,
				@NoOfDays = DR.NoOfDays  ,@ReqDateTime=DR.ReqDateTime
			FROM 
				DC_BookingRequest DR
			INNER JOIN
				Utaxi_Location L ON DR.FromLocationID = L.AreaID
			INNER JOIN
				Utaxi_Location L2 ON DR.ToLocationID = L2.AreaID
			WHERE 
				RequestID = @RequestID			
			
			
			IF @ServiceTypeID IN (3,19,25,28)
			BEGIN
				SELECT @ServiceNameID=4,@ServiceTypeID=3
			END
				
			
			IF @ServiceNameID IN(1,5,6,7)
				BEGIN
				
						
						SELECT * 
						INTO #LOCATION 
						FROM Utaxi_Location WHERE AreaID IN (@FromLocationID,@ToLocationID)
						
						SELECT * 
						INTO #RATELIST 
						FROM Utaxi_Rate R WHERE R.IsActive = 1 AND R.ServiceTypeID= 1
						AND (R.SourceID = @FromLocationID OR R.SourceID = @ToLocationID)
						AND (R.DestinationID = @FromLocationID OR R.DestinationID = @ToLocationID)				
				
						IF @ServiceNameID IN (7)
						BEGIN
							IF @FromLocationID = 564 AND (CONVERT(VARCHAR, @ReqDateTime,108) BETWEEN '04:00:00' AND '07:45:00') --- AIRPORT Pickup 
							BEGIN
								SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
								R.KM AS KM,
								ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
								R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
								R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
								E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
								R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
								R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
								(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
								ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,
								
								
								--'Actual Rate:545<br/><p class=''clsDiscount''>Discounted Rate:395</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_AC,
								--'Actual Rate:445<br/><p class=''clsDiscount''>Discounted Rate:295</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_NAC,
								
								'Actual Rate:'+ISNULL(R.RateAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateAC,0))-150))+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_AC,
								'Actual Rate:'+ISNULL(R.RateNonAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateNonAC,0))-150))+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_NAC,
								
								
								CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateAC,0))-150)) AS DiscountedRate,
								--'Actual Rate:'+R.RateAC+'<br/><p class=''clsDiscount''>Discounted Rate:'+R.RateAC - 150+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_AC,
								
								CB.CarBodyType 
								INTO #RESULT
								FROM #RATELIST R 
								INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
								INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
								INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
								INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
								LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
								INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
								LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
								WHERE R.VehicleTypeID IN (29) --AND @VehTypeID = -1
								
								UNION  
								
								SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
								R.KM AS KM,
								ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
								R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
								R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
								E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
								R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
								R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
								(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
								ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,
								--'Actual Rate:695<br/><p class=''clsDiscount''>Discounted Rate:545</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_AC,
								--'Actual Rate:595<br/><p class=''clsDiscount''>Discounted Rate:445</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_NAC,
								
								
								'Actual Rate:'+ISNULL(R.RateAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateAC,0))-150))+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_AC,
								'Actual Rate:'+ISNULL(R.RateNonAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateNonAC,0))-150))+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_NAC,
								
								
								--'Actual Rate:'+ISNULL(R.RateAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateAC,0))-150))+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_AC,
								--'Actual Rate:'+ISNULL(R.RateNonAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateNonAC,0))-150))+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_NAC,
								
								
								CONVERT(DECIMAL(18,2),ISNULL(R.RateAC,0))-150 AS DiscountedRate,
								
								--'Actual Rate:'+R.RateAC+'<br/><p class=''clsDiscount''>Discounted Rate:'+R.RateAC - 150+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_AC,
								--'Actual Rate:'+R.RateNonAC+'<br/><p class=''clsDiscount''>Discounted Rate:'+R.RateNonAC - 150+'</p><p class=''clsSaved''>You Saved:150</p>' AS RatePerKM_NAC,
								CB.CarBodyType 
								FROM #RATELIST R 
								INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
								INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
								INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
								INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
								LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
								INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
								LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
								WHERE R.VehicleTypeID IN (42) --AND @VehTypeID = -1
							   
							    UNION
								
								SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
								R.KM AS KM,
								ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
								R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
								R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
								E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
								R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
								R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
								(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
								ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,
								(CASE R.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateAC,0) END) AS RatePerKM_AC,
								(CASE R.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateNonAC,0) END) AS RatePerKM_NAC,
								NULL AS DiscountedRate,CB.CarBodyType 
								FROM #RATELIST R 
								INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
								INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
								INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
								INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
								LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
								INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
								LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
								WHERE R.VehicleTypeID  NOT IN (29,42)
								
								
								SELECT * 
								FROM #RESULT
								ORDER BY CarBodyType 
								
								DROP TABLE #RESULT
								
							END 							
							ELSE IF @ToLocationID = 565 AND (CONVERT(VARCHAR, @ReqDateTime,108) BETWEEN '17:00:00' AND '23:45:00')  ---  Airport Drop
							BEGIN
								PRINT 'Airport Offer'
								SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
								R.KM AS KM,
								ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
								R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
								R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
								E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
								R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
								R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
								(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
								ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,								
								
								'Actual Rate:'+ISNULL(R.RateAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateAC,0))-100))+'</p><p class=''clsSaved''>You Saved:100</p>' AS RatePerKM_AC,
								'Actual Rate:'+ISNULL(R.RateNonAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateNonAC,0))-100))+'</p><p class=''clsSaved''>You Saved:100</p>' AS RatePerKM_NAC,
								
								
								CB.CarBodyType 								
								INTO #RESULT_APT								
								FROM #RATELIST R 
								INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
								INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
								INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
								INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
								LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
								INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
								LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
								WHERE R.VehicleTypeID IN (29)-- AND @VehTypeID = -1
								
								--ORDER BY CB.CarBodyType 
								
								UNION  
								
								SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
								R.KM AS KM,
								ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
								R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
								R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
								E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
								R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
								R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
								(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
								ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,
								'Actual Rate:'+ISNULL(R.RateAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateAC,0))-100))+'</p><p class=''clsSaved''>You Saved:100</p>' AS RatePerKM_AC,
								'Actual Rate:'+ISNULL(R.RateNonAC,0)+'<br/><p class=''clsDiscount''>Discounted Rate:'+CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(R.RateNonAC,0))-100))+'</p><p class=''clsSaved''>You Saved:100</p>' AS RatePerKM_NAC,
								
								
								
								CB.CarBodyType 		
								FROM #RATELIST R 
								INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
								INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
								INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
								INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
								LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
								INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
								LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
								WHERE R.VehicleTypeID IN (42) --AND @VehTypeID = -1
							   
							    UNION
								
								SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
								R.KM AS KM,
								ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
								R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
								R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
								E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
								R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
								R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
								(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
								ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,
								(CASE R.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateAC,0) END) AS RatePerKM_AC,
								(CASE R.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateNonAC,0) END) AS RatePerKM_NAC,
								CB.CarBodyType 
								FROM #RATELIST R 
								INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
								INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
								INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
								INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
								LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
								INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
								LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
								WHERE R.VehicleTypeID  NOT IN (29,42)
								
								SELECT * 
								FROM #RESULT_APT
								ORDER BY CarBodyType
							
								DROP TABLE #RESULT_APT
								 
							END 							
							ELSE
							BEGIN
								SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
								R.KM AS KM,
								ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
								R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
								R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
								E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
								R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
								R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
								(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
								ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,
								(CASE R.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateAC,0) END) AS RatePerKM_AC,
								(CASE R.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateNonAC,0) END) AS RatePerKM_NAC
								FROM #RATELIST R 
								INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
								INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
								INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
								INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
								LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
								INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
								LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
								ORDER BY CB.CarBodyType 
							END
						END
						ELSE
						BEGIN
							SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
							R.KM AS KM,
							ISNULL(R.RateAC,0) AS RateAC,ISNULL(R.RateNonAC,0) AS RateNonAC,
							R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
							R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
							E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,
							R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
							R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
							(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
							ISNULL(ST.MiniHR,0) AS MiniHR,VT.VName AS VehicleType,@SID AS ServiceTypeID,
							(CASE R.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateAC,0) END) AS RatePerKM_AC,
							(CASE R.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL('Fixed Rate:'+R.RateNonAC,0) END) AS RatePerKM_NAC
							FROM #RATELIST R 
							INNER JOIN #LOCATION L ON R.SourceID=L.AreaID AND L.IsActive=1
							INNER JOIN #LOCATION L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
							INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
							INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
							LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
							INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 	
							LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
							ORDER BY CB.CarBodyType 
												
						END
						DROP TABLE #LOCATION
						DROP TABLE #RATELIST
				END
			ELSE IF @ServiceNameID = 2
				BEGIN
						SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
						R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
						R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,						
						R.RateAC AS MinKMRateAC ,R.RateNonAC AS MinKMRateNonAC,
						R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
						E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
						ISNULL(R.DayBata,0) AS DayBata,ISNULL(R.NightBata,0) AS NightBata,						
						ISNULL(R.KeralaCP,0) AS KeralaCP,
						ISNULL(R.TNCp,0) AS TNCp,
						ISNULL(R.APCp,0) AS APCp,
						ISNULL(R.GoaCp,0) AS GoaCp,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
						ISNULL(R.PondicherryCp,0) AS PondicherryCp,							
						ISNULL(L.MainAreaID,0) AS MainAreaID,							
						R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,						
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						R.RateAC AS RatePerKM_AC,R.RateNonAC AS RatePerKM_NAC,VT.VName AS VehicleType,
						@SID AS ServiceTypeID							
						FROM Utaxi_Rate R 
						INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
						INNER JOIN Utaxi_Location L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
						INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
						LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
						INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
						LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
						WHERE R.IsActive = 1 AND R.ServiceTypeID = @ServiceTypeID 
						AND (R.SourceID = @FromLocationID OR R.SourceID = @ToLocationID)
						AND (R.DestinationID = @FromLocationID OR R.DestinationID = @ToLocationID)
						AND R.VehicleTypeID IN (SELECT  VehicleTypeID FROM Utaxi_ServiceTypeMapping WHERE IsActive=1 AND ServiceTypeID = @ServiceTypeID)
						ORDER BY CB.CarBodyType 
				END
			ELSE  IF @ServiceNameID = 3
				BEGIN
						--EXEC @RequestID 
						
					--	EXEC USP_DC_Home_CreateRequest @Flag = 19,@RequestID=@RequestID
						
						SET @ToMainAreaID=(SELECT  MainAreaID FROM Utaxi_Location WHERE AreaID=@ToLocationID  AND IsActive=1 )		

						SELECT  L.AreaID AS Source,L2.AreaID AS Destination ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
						R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
						
						(CASE R.VehicleTypeID WHEN 29 THEN '250' ELSE '300' END) AS MinKmAC,
						(CASE R.VehicleTypeID WHEN 29 THEN '250' ELSE '300' END) AS MinKmNonAC,
						
						R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
						R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
						E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
						
						(CASE R.DayBata WHEN '' THEN 0 WHEN NULL then 0 ELSE R.DayBata END) AS DayBata,
						(CASE R.NightBata WHEN '' THEN 0 WHEN NULL then 0 ELSE R.NightBata END) AS NightBata,
						
						
						(CASE CP.KAR WHEN 0 THEN 0 ELSE R.KarnatakaCp END) AS KarnatakaCp,
						(CASE CP.KER WHEN 0 THEN 0 ELSE R.KeralaCP END) AS KeralaCP,
						(CASE CP.GOA WHEN 0 THEN 0 ELSE R.GoaCp END) AS GoaCp,			
						(CASE CP.TN WHEN 0 THEN 0 ELSE R.TNCp END) AS TNCp,
						(CASE CP.AP WHEN 0 THEN 0 ELSE R.APCp END) AS APCp,
						(CASE CP.PON WHEN 0 THEN 0 ELSE R.PondicherryCp END) AS PondicherryCp,
			
			
						--(CASE R.KeralaCP WHEN '' THEN 0 WHEN NULL then 0 ELSE R.KeralaCP END) AS KeralaCP,	
						--(CASE R.TNCp WHEN '' THEN 0 WHEN NULL then 0 ELSE R.TNCp END) AS TNCp,	
						--(CASE R.APCp WHEN '' THEN 0 WHEN NULL then 0 ELSE R.APCp END) AS APCp,
						--(CASE R.GoaCp WHEN '' THEN 0 WHEN NULL then 0 ELSE R.GoaCp END) AS GoaCp,	
						--(CASE R.KarnatakaCp WHEN '' THEN 0 WHEN NULL then 0 ELSE R.KarnatakaCp END) AS KarnatakaCp,	
						--(CASE R.PondicherryCp WHEN '' THEN 0 WHEN NULL then 0 ELSE R.PondicherryCp END) AS PondicherryCp,	
					    ISNULL(L.MainAreaID,0) AS MainAreaID,
						R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						VT.VName AS VehicleType
						
						,(CASE R.RateAC  WHEN '' then '0'  WHEN NULL then '0' ELSE R.RateAC END)AS RatePerKM_AC,
						(CASE R.RateNonAC  WHEN '' then '0'  WHEN NULL then '0' ELSE R.RateNonAC END)AS RatePerKM_NAC,
						@SID AS ServiceTypeID,
						R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC
						
						FROM Utaxi_Rate R  
						INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
						INNER JOIN Utaxi_Location L2 ON @ToMainAreaID=L2.AreaID AND L2.IsActive=1
						INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
						LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
						INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
						LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
						LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID
						WHERE R.IsActive = 1 AND R.ServiceTypeID = @ServiceTypeID 						
						AND (R.DestinationID = @ToLocationID)
						AND R.VehicleTypeID IN (SELECT  VehicleTypeID FROM Utaxi_ServiceTypeMapping WHERE IsActive=1 AND ServiceTypeID = @ServiceTypeID)
						ORDER BY CB.CarBodyType 
				END			
			ELSE  IF @ServiceNameID = 4 --Up & Down 
				BEGIN
						SELECT  L.AreaID AS Source,L2.AreaID AS Destination , R.VehicleTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,
						R.KM AS KM,R.RateAC AS RateAC,R.RateNonAC AS RateNonAC,
						R.MinKmAC AS MinKmAC ,R.MinKmNonAC AS MinKmNonAC,R.MinKMRateAC AS MinKMRateAC ,R.MinKMRateNonAC AS MinKMRateNonAC,
						R.ExtKmRateAC AS ExtKmRateAC,R.ExtKmRateNonAC AS ExtKmRateNonAC,R.ExtHrRateAC AS ExtHrRateAC,ExtHrRateNonAC AS ExtHrRateNonAC,
						E.EmpName AS CreatedBy,R.CreatedOn AS CreatedTime,CONVERT(NVARCHAR(20),R.CreatedOn,105) AS CreatedDate,ST.Type,VT.VName AS Vehicle,R.Comments,
						R.DayBata,R.NightBata,R.KeralaCP,R.TNCp,R.APCp,R.GoaCp,R.PondicherryCp,ISNULL(L.MainAreaID,0) AS MainAreaID,ISNULL(R.KarnatakaCp,0) AS KarnatakaCp,
						R.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						R.RateAC AS RatePerKM_AC,R.RateNonAC AS RatePerKM_NAC,VT.VName AS VehicleType,
						@SID AS ServiceTypeID	
						FROM Utaxi_Rate R  
						INNER JOIN Utaxi_Location L ON R.SourceID=L.AreaID AND L.IsActive=1
						INNER JOIN Utaxi_Location L2 ON R.DestinationID=L2.AreaID AND L2.IsActive=1
						INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
						LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
						INNER JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
						LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID	
						WHERE R.IsActive = 1 AND R.ServiceTypeID = @ServiceTypeID 
						AND (R.SourceID = @FromLocationID OR R.SourceID = @ToLocationID)
						AND (R.DestinationID = @FromLocationID OR R.DestinationID = @ToLocationID)
						AND R.VehicleTypeID IN (SELECT  VehicleTypeID FROM Utaxi_ServiceTypeMapping WHERE IsActive=1 AND ServiceTypeID = @ServiceTypeID)						
						ORDER BY CB.CarBodyType 						
				END	
				
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH		
	END
	
	ELSE IF @Flag = 23 -- View Request 
	BEGIN
		BEGIN TRY
			
			--EXEC USP_DC_Home_CreateRequest 23,9
			
			--SELECT @RateID=RateID ,@ServiceNameID=ServiceNameID
			--FROM DC_BookingRequest
			--WHERE RequestID = @RequestID
			
			SELECT 
				@ServiceTypeID=ServiceTypeID ,@BranchID=81,@FromLocationID=L.MainAreaID,@ToLocationID=L2.MainAreaID,
				@ServiceNameID  = DR.ServiceNameID,@SID=ServiceTypeID,
				@NoOfDays = DR.NoOfDays  ,@ReqDateTime=DR.ReqDateTime ,@RateID=RateID 
			FROM 
				DC_BookingRequest DR
			INNER JOIN
				Utaxi_Location L ON DR.FromLocationID = L.AreaID
			INNER JOIN
				Utaxi_Location L2 ON DR.ToLocationID = L2.AreaID
			WHERE 
				RequestID = @RequestID				
			
		    SELECT * INTO #Utaxi_Rate FROM Utaxi_Rate WHERE RateID = @RateID
		--	SELECT * INTO #Utaxi_Rate FROM Ut_Rate WHERE RateID = @RateID
			
			SELECT @VehTypeID=VehicleTypeID
			FROM #Utaxi_Rate
			WHERE RateID = @RateID
				
			
			IF 	@ServiceNameID = 3
			BEGIN				
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				
				(CASE R.VehTypeID WHEN 29 THEN '250' ELSE '300' END) AS MinKmAC,
				(CASE R.VehTypeID WHEN 29 THEN '250' ELSE '300' END) AS MinKMNAC,
				ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
				RS.RateAC,RS.RateNonAC,
				(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RatePerKM_AC,
				(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RatePerKM_NAC,						
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
				WHERE R.RequestID = @RequestID
			END
			ELSE IF @ServiceNameID = 2
			BEGIN				
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,		
				ISNULL(RS.RateAC,'0') AS MinKMRateAC ,ISNULL(RS.RateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
				ISNULL(RS.RatePAC,'0') AS RateAC, ISNULL(RS.RatePNonAC,'0') AS RateNonAC,
				ISNULL(RS.RateAC,'0') AS RatePerKM_AC,ISNULL(RS.RateNonAC,0) AS RatePerKM_NAC,
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
				WHERE R.RequestID = @RequestID
			END
			ELSE IF @ServiceNameID = 7
			BEGIN	
					--EXEC USP_DC_Home_CreateRequest 23,940
			
					PRINT @VehTypeID
				IF @FromLocationID = 564 AND (CONVERT(VARCHAR, @ReqDateTime,108) BETWEEN '04:00:00' AND '07:45:00') AND @VehTypeID = 29 --AND @VehTypeID = -1 --- AIRPORT Pickup 
				BEGIN	
						
						PRINT 'Airport Pickup offer for Indica'		
						SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
						R.RequestRefNO,L.AreaID AS FromLocationID,
						L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
						CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
						ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,
						ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
						ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
						ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
						R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
						ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
						(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
						(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
						(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
						(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
						(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
						(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
						ACrNAC,PaymnetTypeID,	
						ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
						ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
						ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
						RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						--(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RateAC,
						--(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RateNonAC,	
						
						
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateAC,0))-150)) AS RateAC,
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateNonAC,0))-150)) AS RateNonAC,							
						
						(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RatePerKM_AC,
						(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RatePerKM_NAC,	
						RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
						ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
						ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
						FROM DC_BookingRequest R 
						INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
						INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
						INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
						LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
						LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
						LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
						WHERE R.RequestID = @RequestID	
				END
				ELSE IF @FromLocationID = 564 AND (CONVERT(VARCHAR, @ReqDateTime,108) BETWEEN '04:00:00' AND '07:45:00') AND @VehTypeID = 42 --AND @VehTypeID = -1 --- AIRPORT Pickup 
				BEGIN	
						PRINT 'Airport Pickup offer for Sedan'		
								
						SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
						R.RequestRefNO,L.AreaID AS FromLocationID,
						L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
						CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
						ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,
						ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
						ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
						ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
						R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
						ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
						(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
						(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
						(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
						(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
						(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
						(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
						ACrNAC,PaymnetTypeID,	
						ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
						ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
						ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
						RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateAC,0))-150)) AS RateAC,
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateNonAC,0))-150)) AS RateNonAC,							
						
						(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RatePerKM_AC,
						(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RatePerKM_NAC,	
						RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
						ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
						ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
						FROM DC_BookingRequest R 
						INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
						INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
						INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
						LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
						LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
						LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
						WHERE R.RequestID = @RequestID	
				END
				
				ELSE IF @ToLocationID = 565 AND (CONVERT(VARCHAR, @ReqDateTime,108) BETWEEN '17:00:00' AND '23:45:00') AND @VehTypeID = 29 --AND @VehTypeID = -1 ---  Airport Drop
				BEGIN
						SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
						R.RequestRefNO,L.AreaID AS FromLocationID,
						L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
						CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
						ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,
						ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
						ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
						ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
						R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
						ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
						(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
						(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
						(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
						(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
						(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
						(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
						ACrNAC,PaymnetTypeID,	
						ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
						ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
						ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
						RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateAC,0))-100)) AS RateAC,
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateNonAC,0))-100)) AS RateNonAC,	
						
						(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RatePerKM_AC,
						(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RatePerKM_NAC,	
						RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
						ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
						ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
						FROM DC_BookingRequest R 
						INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
						INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
						INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
						LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
						LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
						LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
						WHERE R.RequestID = @RequestID	
				END
				ELSE IF @ToLocationID = 565 AND (CONVERT(VARCHAR, @ReqDateTime,108) BETWEEN '17:00:00' AND '23:45:00') AND @VehTypeID = 42 --AND @VehTypeID = -1 ----  Airport Drop
				BEGIN
						SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
						R.RequestRefNO,L.AreaID AS FromLocationID,
						L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
						CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
						ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,
						ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
						ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
						ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
						R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
						ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
						(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
						(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
						(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
						(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
						(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
						(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
						ACrNAC,PaymnetTypeID,	
						ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
						ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
						ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
						RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateAC,0))-100)) AS RateAC,
						CONVERT(NVARCHAR(20),(CONVERT(DECIMAL(18,2),ISNULL(RS.RateNonAC,0))-100)) AS RateNonAC,	
						
						(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RatePerKM_AC,
						(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RatePerKM_NAC,	
						RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
						ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
						ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
						FROM DC_BookingRequest R 
						INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
						INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
						INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
						LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
						LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
						LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
						WHERE R.RequestID = @RequestID	
				END
				ELSE
				BEGIN
						PRINT 'Airport Transfer'	
						SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
						R.RequestRefNO,L.AreaID AS FromLocationID,
						L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
						CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
						ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,
						ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
						ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
						ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
						R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
						ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
						(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
						(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
						(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
						(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
						(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
						(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
						ACrNAC,PaymnetTypeID,	
						ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
						ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
						ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
						RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
						(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
						ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
						(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RateAC,
						(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RateNonAC,	
						
						(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RatePerKM_AC,
						(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RatePerKM_NAC,	
						RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
						ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
						ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
						FROM DC_BookingRequest R 
						INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
						INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
						INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
						INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
						LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
						LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
						LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
						WHERE R.RequestID = @RequestID				
				END
				
			END
			ELSE
			BEGIN				
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,
				ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
				(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RateAC,
				(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RateNonAC,	
				
				(CASE RS.RateAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateAC,0) END) AS RatePerKM_AC,
				(CASE RS.RateNonAC WHEN NULL THEN '0' WHEN '' THEN '0' ELSE ISNULL(RS.RateNonAC,0) END) AS RatePerKM_NAC,	
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #Utaxi_Rate RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
				WHERE R.RequestID = @RequestID
			END
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH	
		
		DROP TABLE 	#Utaxi_Rate	
	END			
	
	ELSE IF @Flag = 24 -- Continue Check Out - Web Rate 
	BEGIN
	
		-- EXEC USP_DC_Home_CreateRequest 24,1
	
		BEGIN TRY
		 BEGIN TRANSACTION 	
				IF EXISTS(SELECT RequestID FROM DC_BookingRequest WHERE RequestID = @RequestID)
				BEGIN
									
					SELECT @RateID = B.RateID ,@ServiceNameID = ServiceNameID,@VehTypeID = R.VehicleTypeID
					FROM DC_BookingRequest B
					INNER JOIN Ut_Rate R ON B.RateID =R.RateID
					WHERE RequestID = @RequestID
					
					--IF @AcTypeID = 1
					--BEGIN
					--	SELECT @MinKM=ISNULL(MinKmAC,0),@MinRate=ISNULL(MinKMRateAC,0),@ExtraKM=ISNULL(ExtKmRateAC,0),@ExtraHour=ISNULL(ExtHrRateAC,0) --,@VehTypeID = VehicleTypeID
					--	FROM Utaxi_Rate 
					--	WHERE RateID = @RateID
					--END
					--ELSE
					--BEGIN
					--	SELECT @MinKM=ISNULL(MinKmNonAC,0),@MinRate=ISNULL(MinKMRateNonAC,0),@ExtraKM=ISNULL(ExtKmRateNonAC,0),@ExtraHour=ISNULL(ExtHrRateNonAC,0)--,@VehTypeID = VehicleTypeID
					--	FROM Utaxi_Rate 
					--	WHERE RateID = @RateID
					--END
				
					
					IF @ServiceNameID = 3
					BEGIN
						SELECT @MinRate=(@RatePerKM * @MinKM)
					END
				
				
					
					--UPDATE DC_BookingRequest
					--SET VehTypeID=@VehTypeID 	
					--WHERE RequestID = @RequestID
					
					UPDATE DC_BookingRequest
					SET ACrNAC=@AcTypeID ,Toll=@Toll,Parking=@Parking,Carrier=@Carrier,MiddlePickup=@MiddlePickup,				
					MinKM=@MinKM,MinRate=@MinRate,ExtraKM=@ExtraKM,ExtraHour=@ExtraHour,					
					PaymnetTypeID=@PaymentTypeID,
					TotalTripFare=@TotalTripFare,PaidAmount =@PaidAmount,--Discount = @Discount,
					Balance=@Balance ,
					ExtraPerson=@ExtraPerson ,DayBata=@DayBata	,NightBata=@NightBata,RatePerKM=@RatePerKM,
					KarnatakaCp=@KarCp ,KeralaCP=@KerCp	,TNCp=@TNCp,GoaCp=@GoaCp,PondicherryCp=@PondyCp,APCp=@APCp			
					WHERE RequestID = @RequestID
					
					SELECT @RequestID
				END
				ELSE
				BEGIN
					SELECT 0
				END
		 COMMIT  
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			ROLLBACK
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
			SELECT 0
		END CATCH
	END
	
	ELSE IF @Flag = 25 -- Cancel Reason
	BEGIN
		BEGIN TRY		
			SELECT CancelReason AS TEXTFIELD,CancelID AS VALUEFIELD
			FROM Utaxi_CancelReason
			WHERE IsActive=1 --AND BranchID = @BranchID
			ORDER BY CancelReason
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END	
	
	ELSE IF @Flag = 26 --Payment Gate Way For Utaxi
		BEGIN
			--EXEC USP_DC_Home_CreateRequest 20 ,@BookID=286999
		
			--DECLARE @UserName NVARCHAR(150)=NULL,@EmailID NVARCHAR(150)=NULL,@MobileNo VARCHAR(20)=NULL,@Fare NVARCHAR(50)=NULL,
			--@API NVARCHAR(MAX)=NULL,@DataSign NVARCHAR(500)=NULL ,@TripPaidAmount NVARCHAR(20)=NULL
			
	  --  SELECT @BookID=3191--,@BranchID=81
		
			SELECT @API=PG.PGAPI,@BranchID=81
			FROM DC_PaymentGateway PG
			WHERE StatusID=1 AND SubBranchID = 1
			
			SELECT @UserName=C.Name,@MobileNo= RIGHT(CONVERT(VARCHAR,C.ContactNo,100),10)  ,@EmailID=C.Email_ID,@TripPaidAmount=CONVERT(VARCHAR(50),F.TripFarePaid)
			FROM Utaxi_BookingOrder B
			INNER JOIN Utaxi_Customer C ON B.CustID = C.CustID
			INNER JOIN Utaxi_Fare F ON B.BookID = F.BookID
			WHERE B.BookID = @BookID AND B.BranchID = @BranchID
			
			
			
			SELECT @API=REPLACE(@API,'#NAME#',@UserName)
			
			SELECT @API=REPLACE(@API,'#EMAILID#',@EmailID)	
			PRINT @API
			SELECT @API=REPLACE(@API,'#MOBILENO#',@MobileNo)	
			SELECT @API=REPLACE(@API,'#FARE#',@TripPaidAmount)		
		    --EXEC USP_DC_Home_CreateRequest 20
		    SELECT @DataSign =CONVERT(VARCHAR(10),@TripPaidAmount)+'|'+@EmailID+'|'+@UserName+'|'+@MobileNo
		     --SELECT @DataSign =@UserName+'|'+@EmailID+'|'+@MobileNo+'|'+CONVERT(VARCHAR(5),@Min_Amount)
			SELECT @API AS PGAPI ,@DataSign AS DataSign
		END	
	
	ELSE IF @Flag = 27
		BEGIN
			IF  @ReqDateTime <= DATEADD(MI,120,GETDATE())
				BEGIN
					SELECT 0 AS Result
					--PRINT 'Please Book a cab before 2 hours of your trip. For immediate booking call 080 - 640 88888'
				END
			ELSE 
				BEGIN
					SELECT 1  AS Result
					--PRINT 'You Can Book Now'
				END
		END	 		
	--ELSE IF @Flag = 28-- Airport Pickup Rate 
	--BEGIN
	--	BEGIN TRY		
	--		SELECT TOP 10 FromPlace,ToPlace,Indica_AC,Indica_NAC,Sedan_AC,Sedan_NAC
	--		FROM DC_RATELIST_SEO_AirportPickup
	--		ORDER BY ToPlace
	--	END TRY
	--	BEGIN CATCH
	--		INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
	--		SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
	--	END CATCH			
	--END	
	
	ELSE IF @Flag = 29 -- To Get the Timepart for Site Home page
		 BEGIN	
		 
		 --EXEC USP_DC_Home_CreateRequest @Flag = 29,@ReqDateTime='12/01/2016',@HourID=7
		 
			DECLARE @CurrentDate NVARCHAR(3) 
			DECLARE @DateDiff NVARCHAR(3)							
			DECLARE @HourPart INT
			DECLARE @MinutePart INT
			DECLARE @HourParts INT						

			--SET @DateDiff = (SELECT DATEDIFF(day,GETDATE(),'09/14/2013') AS DiffDate)
			SET @DateDiff = (SELECT DATEDIFF(day,GETDATE(),@ReqDateTime) AS DiffDate)

			IF @DateDiff = '0' -- If it's Today
				BEGIN
					SET @CurrentDate = (SELECT SUBSTRING(CONVERT(varchar(20), GETDATE(), 22), 19, 2) AS CurrentDate) -- To Get Current Date AM/PM
					SET @HourPart = (SELECT DATEPART(HH,GETDATE())) -- To Get Current Date Hour Part
					SET @MinutePart = (SELECT DATEPART(MI,GETDATE()))-- To Get Current Date Minute Part
					
					IF @CurrentDate = 'AM' -- If It's AM
						BEGIN	
									
							IF @HourPart > @HourID OR @HourID = 12 -- Check if it's 12, then load PM Alone
								BEGIN
									SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
									FROM Utaxi_AMPM 
									WHERE AMPMID NOT IN(1)
									ORDER BY AMPM	
								END 							
							ELSE-- If it's not 12, Load both AM/PM
								BEGIN
									IF @HourPart = @HourID AND @MinutePart >= 45
										BEGIN											
											SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
											FROM Utaxi_AMPM 
											WHERE AMPMID NOT IN(1)
											ORDER BY AMPM
										END
									ELSE
										BEGIN
											SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
											FROM Utaxi_AMPM 
											ORDER BY AMPM
										END	
								END
								
							SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
							FROM Utaxi_Hour 
							--WHERE Hour >= @HourParts
							ORDER BY Hour
						END	
					ELSE -- If it's PM
						BEGIN
							-- To display PM only
							SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
							FROM Utaxi_AMPM 
							WHERE AMPMID NOT IN(1)
							ORDER BY AMPM
							
							SET @HourParts = @HourPart - 12 -- To get the Particular Current Hour Part
							
							IF @MinutePart >= 45-- If minute is above 45 no need to display that particular hour
								BEGIN
									SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
									FROM Utaxi_Hour 
									WHERE Hour > @HourParts AND HourID NOT IN(12)
									ORDER BY Hour
								END
							ELSE
								BEGIN
									IF @HourParts = 0 -- Check if it's 12, then load all the Hour
										BEGIN
											SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
											FROM Utaxi_Hour 											
											ORDER BY Hour
										END
									ELSE
										BEGIN -- Check if it's not 12, then load all the Hour Except 12
											SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
											FROM Utaxi_Hour 
											WHERE Hour >= @HourParts AND HourID NOT IN(12)
											ORDER BY Hour
										END									
								END									
						END
						
					IF @HourParts = 0 AND @HourID = 12 -- Check if it's 12, then load all the Minutes above current minutes
						BEGIN
							SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
							FROM Utaxi_Minute 
							WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
							ORDER BY Minute		
						END
					ELSE -- Check if it's not 12
						BEGIN
							IF @HourID = @HourParts -- If selected hour and current hour both are same, then load all the Minutes above current minutes
								BEGIN
									SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
									FROM Utaxi_Minute 
									WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
									ORDER BY Minute		
								END
							 ELSE -- If selected hour and current hour both are different, then load all the Minutes
								BEGIN
									SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
									FROM Utaxi_Minute 
									WHERE MinuteID IN(3,6,9,12)
									ORDER BY Minute	
								END
						END
				END
			ELSE -- If it's not Today
				BEGIN	
					SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
					FROM Utaxi_AMPM 
					ORDER BY AMPM
					
					SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
					FROM Utaxi_Hour 
					ORDER BY Hour
					
					SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
					FROM Utaxi_Minute 
					WHERE MinuteID IN(3,6,9,12)
					ORDER BY Minute
				END		
		 END
		 
	ELSE IF @Flag = 30
	BEGIN
		SELECT V.VehicleNumber ,VT.VName AS VehicleType ,L.AreaName AS ReportingPlace,
		D.DriverName,D.ContactNumber ,PlaceID
		FROM Utaxi_FreeVehicle FV
		INNER JOIN Utaxi_Location L ON FV.PlaceID = L.AreaID
		INNER JOIN Utaxi_Vehicle V ON FV.VehID = V.VehID
		INNER JOIN Utaxi_Driver D ON FV.DriverID = D.Driver_ID
		INNER JOIN Utaxi_VehicleType VT ON V.VehTypeID=VT.ID
		WHERE PlaceID IN (SELECT AreaID FROM Utaxi_Location WHERE MainAreaID=803 )
	END	 
	
	ELSE IF @Flag = 31 --PayTM Payment Gate Way For Utaxi
		BEGIN
			--EXEC USP_DC_Home_CreateRequest 31 ,@BookID=287677 ,@BranchID=81
			
			SELECT BookID,CustID
			INTO #BookingOrder_PayTM
			FROM Utaxi_BookingOrder
			WHERE BookID=@BookID --AND BranchID = @BranchID
			
			SELECT *
			INTO #Customer_PayTM
			FROM Utaxi_Customer
			WHERE CustID IN(SELECT CustID FROM #BookingOrder_PayTM)
			
			SELECT *
			INTO #Fare_PayTM
			FROM Utaxi_Fare
			WHERE BookID IN(SELECT BookID FROM #BookingOrder_PayTM)
			
			SELECT C.Name,RIGHT(CONVERT(VARCHAR,C.ContactNo,100),10)AS MobileNo,C.Email_ID AS EmailID,
			CONVERT(VARCHAR(50),F.TripFarePaid) AS TripPaidAmount,
			--10 AS TripPaidAmount,
			C.CustID,B.BookID
			FROM #BookingOrder_PayTM B
			INNER JOIN #Customer_PayTM C ON B.CustID = C.CustID
			INNER JOIN #Fare_PayTM F ON B.BookID = F.BookID
			WHERE B.BookID = @BookID 
						
			DROP TABLE #BookingOrder_PayTM 
			DROP TABLE #Customer_PayTM
			DROP TABLE #Fare_PayTM			
		END	
		
	ELSE IF @Flag = 32 --ACorNAC  Type 
		BEGIN
			BEGIN TRY
					IF @VehTypeID IN (34,35,36) --Only AC Vehicle
					BEGIN
						SELECT ID AS VALUEFIELD,UPPER(Name) AS TEXTFIELD
						FROM Utaxi_ACorNAC 
						WHERE IsActive = 1 AND ID IN (1)		
					END	
					ELSE --Both AC/Non AC Vehicle
					BEGIN
						SELECT ID AS VALUEFIELD,UPPER(Name) AS TEXTFIELD
						FROM Utaxi_ACorNAC 
						WHERE IsActive = 1		
					END		
			END TRY
			BEGIN CATCH
				IF @@TRANCOUNT > 0
				ROLLBACK
				INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
				SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
			END CATCH
		END	
		
	ELSE IF @Flag = 33 --Fill Vehicle Type 
		BEGIN			
			IF @ServiceTypeID = 7
			BEGIN
				SELECT @ServiceTypeID=(CASE @StatusID WHEN 1 THEN 18 WHEN 2 THEN 17 WHEN 3 THEN 19 END)
			END
			ELSE IF @ServiceTypeID = 5
			BEGIN
				SELECT @ServiceTypeID=(CASE @StatusID WHEN 1 THEN 27 WHEN 2 THEN 26 WHEN 3 THEN 28 END)
			END
			ELSE IF @ServiceTypeID = 6
			BEGIN
				SELECT @ServiceTypeID=(CASE @StatusID WHEN 1 THEN 24 WHEN 2 THEN 23 WHEN 3 THEN 25 END)
			END
			
		
			SELECT VT.ID  AS VALUEFIELD ,VName AS TEXTFIELD
			FROM Utaxi_VehicleType VT
			INNER JOIN Utaxi_ServiceTypeMapping STM ON  VT.ID = STM.VehicleTypeID AND STM.IsActive = 1 		
			WHERE STM.ServiceTypeID = @ServiceTypeID AND STM.BranchID = @BranchID AND VT.IsActive=1	
			ORDER BY VName
		END	
	
	ELSE IF @Flag = 34
	BEGIN
		BEGIN TRY
			
			--EXEC USP_DC_Home_CreateRequest @Flag = 34, @RequestID=36
		--	SELECT @FromLocationID=953,@ToLocationID=565,@BranchID=81,@ServiceTypeID=18
			
			DECLARE @pkgMinRateAC NVARCHAR(700)=NULL,@pkgExtKMRateAC NVARCHAR(50)=NULL,@pkgExtHrRateAC NVARCHAR(700)=NULL
			DECLARE @pkgMinRateNAC NVARCHAR(700)=NULL,@pkgExtKMRateNAC NVARCHAR(700)=NULL,@pkgExtHrRateNAC NVARCHAR(700)=NULL
			
						
			SELECT @ServiceTypeID=ServiceTypeID ,@BranchID=81,@KMValue=ApproxKM,@ReqDateTime=ReqTime,@ServiceNameID = ServiceNameID
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID			
			
			
			EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=@RequestID,@ServiceTypeID=@ServiceTypeID,@KMValue=@KMValue,@ReqDateTime=@ReqDateTime
		
			--SELECT * FROM Utaxi_Rate where ServiceTypeID=2

			--IF @ServiceNameID = 2
			--BEGIN
			--	SELECT @pkgMinRateAC = RateAC,@pkgExtKMRateAC=ExtKmRateAC,@pkgExtHrRateNAC=ExtHrRateAC,
			--		   @pkgMinRateNAC = RateNonAC,@pkgExtKMRateAC=ExtKmRateAC,@pkgExtHrRateNAC=ExtHrRateAC
			--	FROM Utaxi_Rate
			--	WHERE ServiceTypeID = @ServiceTypeID
			--END
			
			
			SELECT (CASE VT.ID WHEN 29 THEN 'Hatchback (4+1)' WHEN 42 THEN 'Sedan (4+1)' ELSE VT.VName END) AS VehicleType,CB.CarBodyType,
			VT.VehicleBodyTypeID,R.VehicleTypeID,					
			ISNULL(R.MinKmAC,0) AS MinKMAC ,ISNULL(R.MinKmNonAC,0) AS MinKMNAC,ISNULL(R.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(R.MinKMRateNonAC,0) AS MinKMRateNAC,
			ISNULL(R.ExtKmRateAC,0) AS ExtraKMRateAC,ISNULL(R.ExtKmRateNonAC,0) AS ExtraKMRateNAC,ISNULL(R.ExtHrRateAC,0) AS ExtraHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
			R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,ISNULL(R.DayBata,0) AS DayBata,ISNULL(R.NightBata,0) AS NightBata,
			(CASE CP.KAR WHEN 0 THEN 0 ELSE R.KarnatakaCp END) AS KarnatakaCp,
			(CASE CP.KER WHEN 0 THEN 0 ELSE R.KeralaCP END) AS KeralaCP,
			(CASE CP.GOA WHEN 0 THEN 0 ELSE R.GoaCp END) AS GoaCp,			
			(CASE CP.TN WHEN 0 THEN 0 ELSE R.TNCp END) AS TNCp,
			(CASE CP.AP WHEN 0 THEN 0 ELSE R.APCp END) AS APCp,
			(CASE CP.PON WHEN 0 THEN 0 ELSE R.PondicherryCp END) AS PondicherryCp,
			VT.Passenger,VT.AC,VT.NonAC,
			(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
			ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
			ISNULL(R.RatePerKM_AC,0) AS RatePerKM_AC,ISNULL(R.RatePerKM_NAC,0) AS RatePerKM_NAC	,
			CONVERT(DECIMAL(18,0),FG.ACFare) AS FG_AC, CONVERT(DECIMAL(18,0),FG.NonACFare) AS FG_NonAC,
			FG.ApproxKM	,CONVERT(DECIMAL(18,0),FG.Discount) AS OfferDiscount, R.pkgExtHrRateAC,R.pkgExtHrRateNAC	
			
				
			FROM UT_Rate R 
			INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
			LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID			
			LEFT JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
			LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
			LEFT JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
			LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID
			LEFT JOIN DC_KMFareGenerate FG ON R.VehicleTypeID=FG.VehicleTypeID AND FG.RequestID =  @RequestID
			WHERE R.IsActive = 1 AND R.ServiceTypeID = @ServiceTypeID
			ORDER BY	VT.OrderBy 	
			
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH	
		
	END	
	
	ELSE IF @Flag = 35 -- View Request 
	BEGIN
		BEGIN TRY
			
			--EXEC USP_DC_Home_CreateRequest @Flag = 35,@RequestID=50
			
			--SELECT @RateID=RateID ,@ServiceNameID=ServiceNameID
			--FROM DC_BookingRequest
			--WHERE RequestID = @RequestID
			
			SELECT 
				@ServiceTypeID=ServiceTypeID ,@BranchID=81,@FromLocationID=L.MainAreaID,@ToLocationID=L2.MainAreaID,
				@ServiceNameID  = DR.ServiceNameID,@SID=ServiceTypeID,
				@NoOfDays = DR.NoOfDays  ,@ReqDateTime=DR.ReqDateTime ,@RateID=RateID 
			FROM 
				DC_BookingRequest DR
			INNER JOIN
				Utaxi_Location L ON DR.FromLocationID = L.AreaID
			INNER JOIN
				Utaxi_Location L2 ON DR.ToLocationID = L2.AreaID
			WHERE 
				RequestID = @RequestID				
			
		    SELECT * INTO #UT_Rate FROM Ut_Rate WHERE RateID = @RateID
		--	SELECT * INTO #Utaxi_Rate FROM Ut_Rate WHERE RateID = @RateID
			
				SELECT @VehTypeID=VehicleTypeID
				FROM #UT_Rate
				WHERE RateID = @RateID
				
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,		
				ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ISNULL(ACrNAC,0) AS ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
				CONVERT(DECIMAL(18,0),FG.ACFare) AS RateAC, CONVERT(DECIMAL(18,0),FG.NonACFare) AS RateNonAC,  
				RS.RatePerKM_AC AS RatePerKM_AC,RS.RatePerKM_NAC AS RatePerKM_NAC,
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				'0' AS RatePAC ,'0'  AS RatePNonAC ,
				CONVERT(DECIMAL(18,0),R.ApproxKM)  AS ApproxKM,R.ApproxKMText AS ApproxKMText 				
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #UT_Rate RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
				LEFT JOIN DC_KMFareGenerate FG ON RS.VehicleTypeID=FG.VehicleTypeID AND FG.RequestID =  R.RequestID
				WHERE R.RequestID = @RequestID
				
				
				---SELECT * FROM DC_KMFareGenerate R WHERE R.RequestID = @RequestID
				
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH	
		
		DROP TABLE 	#UT_Rate	
	END	
	
	ELSE IF @Flag = 36 -- Get LatLong 
	BEGIN
		BEGIN TRY
			--SELECT L.Latitude+','+L.Longitude AS FLatLong,L1.Latitude+','+L1.Longitude AS TLatLong
			--FROM DC_BookingRequest R 
			--INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
			--INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
			--WHERE R.RequestID = @RequestID
			
			SELECT L.AreaAddress AS FLatLong,L1.AreaAddress AS TLatLong
			FROM DC_BookingRequest R 
			INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
			INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
			WHERE R.RequestID = @RequestID
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH			
	END			
	
	ELSE IF @Flag = 37
		BEGIN
			--SELECT * FROM DC_AutoDispatchFilter 
			
			SELECT @ServiceTypeID = ServiceTypeID FROM DC_BookingRequest WHERE RequestID = @RequestID
			
			IF @KMValue <> 0 AND @KMValue  IS NOT NULL
				BEGIN
					SET @KMValue =(@KMValue/1000)
				END
			ELSE
				BEGIN
					SET @KMValue =0
				END
			
			IF @ServiceTypeID = 19
			BEGIN
				SELECT @KMValue = (@KMValue * 2),@KMText= CONVERT(VARCHAR(20),@KMValue)+' KM'
			END
			
			UPDATE DC_BookingRequest
			SET ApproxKM= CONVERT(DECIMAL(18,0),@KMValue),ApproxKMText=@KMText
			WHERE RequestID = @RequestID			
		END 
		
		
		
		
ELSE IF @Flag = 38 -- To Get the Timepart for Site Home page
		 BEGIN	
		 
		 --EXEC USP_DC_Home_CreateRequest @Flag = 29,@ReqDateTime='12/01/2016',@HourID=7
		 
			DECLARE @CurrentDate1 NVARCHAR(3) 
			DECLARE @DateDiff1 NVARCHAR(3)							
			DECLARE @HourPart1 INT
			DECLARE @MinutePart1 INT
			DECLARE @HourParts1 INT						

			SET @DateDiff1 = (SELECT DATEDIFF(day,GETDATE(),'03/15/2017') AS DiffDate)
			--SET @DateDiff1 = (SELECT DATEDIFF(day,GETDATE(),@ReqDateTime) AS DiffDate)

			--IF @DateDiff1 = '0' -- If it's Today
			--	BEGIN
			--		SET @CurrentDate1 = (SELECT SUBSTRING(CONVERT(varchar(20), GETDATE(), 22), 19, 2) AS CurrentDate) -- To Get Current Date AM/PM
			--		SET @HourPart = (SELECT DATEPART(HH,GETDATE())) -- To Get Current Date Hour Part
			--		SET @MinutePart1 = (SELECT DATEPART(MI,GETDATE()))-- To Get Current Date Minute Part
					
			--		IF @CurrentDate1 = 'AM' -- If It's AM
			--			BEGIN	
									
			--				IF @HourPart > @HourID OR @HourID = 12 -- Check if it's 12, then load PM Alone
			--					BEGIN
			--						SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--						FROM Utaxi_AMPM 
			--						WHERE AMPMID NOT IN(1)
			--						ORDER BY AMPM	
			--					END 							
			--				ELSE-- If it's not 12, Load both AM/PM
			--					BEGIN
			--						IF @HourPart = @HourID AND @MinutePart1 >= 45
			--							BEGIN											
			--								SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--								FROM Utaxi_AMPM 
			--								WHERE AMPMID NOT IN(1)
			--								ORDER BY AMPM
			--							END
			--						ELSE
			--							BEGIN
			--								SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--								FROM Utaxi_AMPM 
			--								ORDER BY AMPM
			--							END	
			--					END
								
			--				SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--				FROM Utaxi_Hour 
			--				--WHERE Hour >= @HourParts1
			--				ORDER BY Hour
			--			END	
			--		ELSE -- If it's PM
			--			BEGIN
			--				-- To display PM only
			--				SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--				FROM Utaxi_AMPM 
			--				WHERE AMPMID NOT IN(1)
			--				ORDER BY AMPM
							
			--				SET @HourParts1 = @HourPart - 12 -- To get the Particular Current Hour Part
							
			--				IF @MinutePart1 >= 45-- If minute is above 45 no need to display that particular hour
			--					BEGIN
			--						SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--						FROM Utaxi_Hour 
			--						WHERE Hour > @HourParts1 AND HourID NOT IN(12)
			--						ORDER BY Hour
			--					END
			--				ELSE
			--					BEGIN
			--						IF @HourParts1 = 0 -- Check if it's 12, then load all the Hour
			--							BEGIN
			--								SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--								FROM Utaxi_Hour 											
			--								ORDER BY Hour
			--							END
			--						ELSE
			--							BEGIN -- Check if it's not 12, then load all the Hour Except 12
			--								SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--								FROM Utaxi_Hour 
			--								WHERE Hour >= @HourParts1 AND HourID NOT IN(12)
			--								ORDER BY Hour
			--							END									
			--					END									
			--			END
						
			--		IF @HourParts1 = 0 AND @HourID = 12 -- Check if it's 12, then load all the Minutes above current minutes
			--			BEGIN
			--				SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--				FROM Utaxi_Minute 
			--				WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
			--				ORDER BY Minute		
			--			END
			--		ELSE -- Check if it's not 12
			--			BEGIN
			--				IF @HourID = @HourParts1 -- If selected hour and current hour both are same, then load all the Minutes above current minutes
			--					BEGIN
			--						SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--						FROM Utaxi_Minute 
			--						WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
			--						ORDER BY Minute		
			--					END
			--				 ELSE -- If selected hour and current hour both are different, then load all the Minutes
			--					BEGIN
			--						SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--						FROM Utaxi_Minute 
			--						WHERE MinuteID IN(3,6,9,12)
			--						ORDER BY Minute	
			--					END
			--			END
			--	END
			--ELSE -- If it's not Today
				BEGIN	
					--SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
					--FROM Utaxi_AMPM 
					--ORDER BY AMPM
					
					SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
					FROM Utaxi_Hour 
					ORDER BY Hour
					
					SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
					FROM Utaxi_Minute 
					WHERE MinuteID IN(3,6,9,12)
					ORDER BY Minute
				END		
		 END
		 
		 
		 ELSE IF @Flag = 39 -- To Get the Timepart for Site Home page
		 BEGIN	
		 
		 --EXEC USP_DC_Home_CreateRequest @Flag = 29,@ReqDateTime='12/01/2016',@HourID=7
		 
			--DECLARE @CurrentDate1 NVARCHAR(3) 
			--DECLARE @DateDiff1 NVARCHAR(3)							
			--DECLARE @HourPart1 INT
			--DECLARE @MinutePart1 INT
			--DECLARE @HourParts1 INT						

			--SET @DateDiff1 = (SELECT DATEDIFF(day,GETDATE(),'03/15/2017') AS DiffDate)
			--SET @DateDiff1 = (SELECT DATEDIFF(day,GETDATE(),@ReqDateTime) AS DiffDate)

			--IF @DateDiff1 = '0' -- If it's Today
			--	BEGIN
			--		SET @CurrentDate1 = (SELECT SUBSTRING(CONVERT(varchar(20), GETDATE(), 22), 19, 2) AS CurrentDate) -- To Get Current Date AM/PM
			--		SET @HourPart = (SELECT DATEPART(HH,GETDATE())) -- To Get Current Date Hour Part
			--		SET @MinutePart1 = (SELECT DATEPART(MI,GETDATE()))-- To Get Current Date Minute Part
					
			--		IF @CurrentDate1 = 'AM' -- If It's AM
			--			BEGIN	
									
			--				IF @HourPart > @HourID OR @HourID = 12 -- Check if it's 12, then load PM Alone
			--					BEGIN
			--						SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--						FROM Utaxi_AMPM 
			--						WHERE AMPMID NOT IN(1)
			--						ORDER BY AMPM	
			--					END 							
			--				ELSE-- If it's not 12, Load both AM/PM
			--					BEGIN
			--						IF @HourPart = @HourID AND @MinutePart1 >= 45
			--							BEGIN											
			--								SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--								FROM Utaxi_AMPM 
			--								WHERE AMPMID NOT IN(1)
			--								ORDER BY AMPM
			--							END
			--						ELSE
			--							BEGIN
			--								SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--								FROM Utaxi_AMPM 
			--								ORDER BY AMPM
			--							END	
			--					END
								
			--				SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--				FROM Utaxi_Hour 
			--				--WHERE Hour >= @HourParts1
			--				ORDER BY Hour
			--			END	
			--		ELSE -- If it's PM
			--			BEGIN
			--				-- To display PM only
			--				SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--				FROM Utaxi_AMPM 
			--				WHERE AMPMID NOT IN(1)
			--				ORDER BY AMPM
							
			--				SET @HourParts1 = @HourPart - 12 -- To get the Particular Current Hour Part
							
			--				IF @MinutePart1 >= 45-- If minute is above 45 no need to display that particular hour
			--					BEGIN
			--						SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--						FROM Utaxi_Hour 
			--						WHERE Hour > @HourParts1 AND HourID NOT IN(12)
			--						ORDER BY Hour
			--					END
			--				ELSE
			--					BEGIN
			--						IF @HourParts1 = 0 -- Check if it's 12, then load all the Hour
			--							BEGIN
			--								SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--								FROM Utaxi_Hour 											
			--								ORDER BY Hour
			--							END
			--						ELSE
			--							BEGIN -- Check if it's not 12, then load all the Hour Except 12
			--								SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--								FROM Utaxi_Hour 
			--								WHERE Hour >= @HourParts1 AND HourID NOT IN(12)
			--								ORDER BY Hour
			--							END									
			--					END									
			--			END
						
			--		IF @HourParts1 = 0 AND @HourID = 12 -- Check if it's 12, then load all the Minutes above current minutes
			--			BEGIN
			--				SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--				FROM Utaxi_Minute 
			--				WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
			--				ORDER BY Minute		
			--			END
			--		ELSE -- Check if it's not 12
			--			BEGIN
			--				IF @HourID = @HourParts1 -- If selected hour and current hour both are same, then load all the Minutes above current minutes
			--					BEGIN
			--						SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--						FROM Utaxi_Minute 
			--						WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
			--						ORDER BY Minute		
			--					END
			--				 ELSE -- If selected hour and current hour both are different, then load all the Minutes
			--					BEGIN
			--						SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--						FROM Utaxi_Minute 
			--						WHERE MinuteID IN(3,6,9,12)
			--						ORDER BY Minute	
			--					END
			--			END
			--	END
			--ELSE -- If it's not Today
				BEGIN	
					--SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
					--FROM Utaxi_AMPM 
					--ORDER BY AMPM
					
					--SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
					--FROM Utaxi_Hour 
					--ORDER BY Hour
					
					SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
					FROM Utaxi_Minute 
					WHERE MinuteID IN(3,6,9,12)
					ORDER BY Minute
				END		
		 END
		 
		 
		 
		ELSE IF @Flag = 40 -- To Get the Timepart for Site Home page
		 BEGIN	
		 
		 --EXEC USP_DC_Home_CreateRequest @Flag = 29,@ReqDateTime='12/01/2016',@HourID=7
		 
			DECLARE @CurrentDate2 NVARCHAR(3) 
			DECLARE @DateDiff2 NVARCHAR(3)							
			DECLARE @HourPart2 INT
			DECLARE @MinutePart2 INT
			DECLARE @HourParts2 INT						

			SET @DateDiff2 = (SELECT DATEDIFF(day,GETDATE(),'03/15/2017') AS DiffDate)
			--SET @DateDiff1 = (SELECT DATEDIFF(day,GETDATE(),@ReqDateTime) AS DiffDate)

			--IF @DateDiff1 = '0' -- If it's Today
			--	BEGIN
			--		SET @CurrentDate1 = (SELECT SUBSTRING(CONVERT(varchar(20), GETDATE(), 22), 19, 2) AS CurrentDate) -- To Get Current Date AM/PM
			--		SET @HourPart = (SELECT DATEPART(HH,GETDATE())) -- To Get Current Date Hour Part
			--		SET @MinutePart1 = (SELECT DATEPART(MI,GETDATE()))-- To Get Current Date Minute Part
					
			--		IF @CurrentDate1 = 'AM' -- If It's AM
			--			BEGIN	
									
			--				IF @HourPart > @HourID OR @HourID = 12 -- Check if it's 12, then load PM Alone
			--					BEGIN
			--						SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--						FROM Utaxi_AMPM 
			--						WHERE AMPMID NOT IN(1)
			--						ORDER BY AMPM	
			--					END 							
			--				ELSE-- If it's not 12, Load both AM/PM
			--					BEGIN
			--						IF @HourPart = @HourID AND @MinutePart1 >= 45
			--							BEGIN											
			--								SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--								FROM Utaxi_AMPM 
			--								WHERE AMPMID NOT IN(1)
			--								ORDER BY AMPM
			--							END
			--						ELSE
			--							BEGIN
			--								SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--								FROM Utaxi_AMPM 
			--								ORDER BY AMPM
			--							END	
			--					END
								
			--				SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--				FROM Utaxi_Hour 
			--				--WHERE Hour >= @HourParts1
			--				ORDER BY Hour
			--			END	
			--		ELSE -- If it's PM
			--			BEGIN
			--				-- To display PM only
			--				SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
			--				FROM Utaxi_AMPM 
			--				WHERE AMPMID NOT IN(1)
			--				ORDER BY AMPM
							
			--				SET @HourParts1 = @HourPart - 12 -- To get the Particular Current Hour Part
							
			--				IF @MinutePart1 >= 45-- If minute is above 45 no need to display that particular hour
			--					BEGIN
			--						SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--						FROM Utaxi_Hour 
			--						WHERE Hour > @HourParts1 AND HourID NOT IN(12)
			--						ORDER BY Hour
			--					END
			--				ELSE
			--					BEGIN
			--						IF @HourParts1 = 0 -- Check if it's 12, then load all the Hour
			--							BEGIN
			--								SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--								FROM Utaxi_Hour 											
			--								ORDER BY Hour
			--							END
			--						ELSE
			--							BEGIN -- Check if it's not 12, then load all the Hour Except 12
			--								SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
			--								FROM Utaxi_Hour 
			--								WHERE Hour >= @HourParts1 AND HourID NOT IN(12)
			--								ORDER BY Hour
			--							END									
			--					END									
			--			END
						
			--		IF @HourParts1 = 0 AND @HourID = 12 -- Check if it's 12, then load all the Minutes above current minutes
			--			BEGIN
			--				SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--				FROM Utaxi_Minute 
			--				WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
			--				ORDER BY Minute		
			--			END
			--		ELSE -- Check if it's not 12
			--			BEGIN
			--				IF @HourID = @HourParts1 -- If selected hour and current hour both are same, then load all the Minutes above current minutes
			--					BEGIN
			--						SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--						FROM Utaxi_Minute 
			--						WHERE MinuteID IN(3,6,9,12) AND Minute >= (SELECT DATEPART(MI,GETDATE())) 
			--						ORDER BY Minute		
			--					END
			--				 ELSE -- If selected hour and current hour both are different, then load all the Minutes
			--					BEGIN
			--						SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
			--						FROM Utaxi_Minute 
			--						WHERE MinuteID IN(3,6,9,12)
			--						ORDER BY Minute	
			--					END
			--			END
			--	END
			--ELSE -- If it's not Today
				BEGIN	
					SELECT AMPMID AS VALUEFIELD, AMPM AS TEXTFIELD
					FROM Utaxi_AMPM 
					ORDER BY AMPM
					
					--SELECT HourID AS VALUEFIELD, Hour AS TEXTFIELD
					--FROM Utaxi_Hour 
					--ORDER BY Hour
					
					--SELECT MinuteID AS VALUEFIELD, Minute AS TEXTFIELD
					--FROM Utaxi_Minute 
					--WHERE MinuteID IN(3,6,9,12)
					--ORDER BY Minute
				END		
		 END
		 
		 
	ELSE IF @Flag = 41
	BEGIN
		DECLARE @HourValue INT=NULL , @DayID INT=NULL
		SELECT @HourValue=DATEDIFF(MILLISECOND, 0, CAST(GETDATE() AS TIME)),
			   @DayID=DATEDIFF(DAY,GETDATE(),@ReqDateTime)
			   		
		IF @DayID > 0
			BEGIN
				SELECT HourID AS VALUEFIELD,HourText AS TEXTFIELD 
				FROM UT_Hour
				WHERE IsActive = 1 
				ORDER BY  HourID
			END
		ELSE IF @DayID = 0
			BEGIN				
				SELECT HourID AS VALUEFIELD,HourText AS TEXTFIELD 
				FROM UT_Hour
				WHERE IsActive = 1 AND HourValue > @HourValue
				ORDER BY  HourID
			END	
		ELSE IF @DayID < 0
			BEGIN
				SELECT HourID AS VALUEFIELD,HourText AS TEXTFIELD 
				FROM UT_Hour
				WHERE IsActive = 0
				ORDER BY  HourID
			END	
	END
	
	ELSE IF @Flag = 42
		BEGIN
				SELECT @RequestID=(CASE @RequestID WHEN 0 THEN NULL ELSE @RequestID END)
		
				SELECT * INTO #MustSeePlaces
				FROM Utaxi_MustSeePlaces
				WHERE PlaceID = ISNULL(@RequestID,PlaceID) AND PlaceID < 50  -- 15 --AND ZoneID= ISNULL(@ZoneID,ZoneID) AND StateID= ISNULL(@StateID,StateID) AND DistrictID= ISNULL(@DistrictID,DistrictID)
			
				 SELECT Z.ZoneName, S.StateName, D.DistrictName, MS.PlaceName,
				 LEFT(MS.PlaceDescription,60) AS PlaceDescription,MS.PlaceDescription AS Description, MS.PlaceID, MS.IsActive,
				 E.EMPName AS CreatedBy ,E1.EMPName AS ModifiedBy,
				 CONVERT(NVARCHAR(20),MS.CreatedOn,105) AS CreatedDate,MS.CreatedOn AS CreatedTime,
				 CONVERT(NVARCHAR(20),MS.ModifiedOn,105) AS ModifiedDate,MS.ModifiedOn AS ModifiedTime,
				 NULL AS PackageType ,MS.Opening,MS.Closing,MS.EntryFee,MS.BestTimetoVisit,
				 MS.PlaceImage1,MS.PlaceImage2,MS.PlaceImage3,MS.PlaceImage4,1500 AS Rate 
				 FROM #MustSeePlaces MS
				 INNER JOIN Utaxi_ZoneMaster Z ON Z.ZoneID = MS.ZoneID
				 INNER JOIN Utaxi_StateMaster S ON S.StateID = MS.StateID
				 INNER JOIN Utaxi_DistrictMaster D ON D.DistrictID = MS.DistrictID
				 LEFT JOIN Utaxi_Employee E ON MS.CreatedBy =E.EmpID
				 LEFT JOIN Utaxi_Employee E1 ON MS.ModifiedBy =E1.EmpID
				-- LEFT JOIN DC_PackageType PT ON PT.PackageTypeID = MS.PackageTypeID
				
				DROP TABLE #MustSeePlaces
		END
		
	ELSE IF @Flag = 43-- Fare Generation 
	BEGIN
		--EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=1,@ServiceTypeID=18,@KMValue=43,@ReqDateTime='5:30 PM',@VehTypeID=29
		--EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=@RequestID,@ServiceTypeID=@ServiceTypeID,@KMValue=@KMValue,@ReqDateTime=@ReqDateTime
		DECLARE @GMinFareAC DECIMAL(18,2) =0,@GMinFareNAC DECIMAL(18,2) =0,@DiffAmt DECIMAL(18,2) =0
		
		DELETE FROM DC_KMFareGenerate WHERE CreatedOn < CONVERT(NVARCHAR(20),GETDATE(),101)
		
		IF EXISTS(SELECT FareID FROM DC_KMFareGenerate WHERE RequestID = @RequestID)
		BEGIN
			DELETE FROM DC_KMFareGenerate WHERE RequestID = @RequestID
		END   
		
		SELECT @ServiceTypeID=ServiceTypeID ,@BranchID=81,@KMValue=ApproxKM,@ReqDateTime=ReqTime,@ServiceNameID = ServiceNameID,
		@KMValue=ApproxKM
		FROM DC_BookingRequest
		WHERE RequestID = @RequestID		
		
		--( @ReqDateTime BETWEEN '4:00 AM' AND '7:45 AM')  AND @VehicleTypeID IN (29,42) 
		
		
		INSERT INTO DC_KMFareGenerate(VehicleTypeID,RequestID,ApproxKM)
		SELECT DISTINCT VehicleTypeID, @RequestID,@KMValue
		FROM UT_Rate
		WHERE ServiceTypeID = @ServiceTypeID AND IsActive = 1
		
		DECLARE @FareG TABLE(ID INT IDENTITY(1,1),VehicleTypeID INT,KM DECIMAL(18,2))
		INSERT INTO @FareG(VehicleTypeID,KM)
		SELECT DISTINCT VehicleTypeID,@KMValue
		FROM UT_Rate
		WHERE ServiceTypeID = @ServiceTypeID  AND IsActive = 1
		--ORDER BY CreatedOn DESC
				
		DECLARE @Count INT =0,@RowID INT =1,@I INT=1,@F_AC DECIMAL(18,2) =0,@F_NonAC DECIMAL(18,2) =0,@ApproxKM DECIMAL(18,2) =0
		SELECT @Count=COUNT(ID) FROM @FareG
		WHILE(@I <= @Count)
		BEGIN
			SELECT @VehTypeID = VehicleTypeID,@ApproxKM=KM
			FROM @FareG
			WHERE ID = @I

			PRINT 'Row VehID'+convert(varchar,@VehTypeID)

			
			SELECT TOP 1 @F_AC=
			(CASE 
			WHEN ISNULL(MinKMAC,0) > @ApproxKM THEN ISNULL(MinKMRateAC,0) 
			WHEN ISNULL(MinKMAC,0) < @ApproxKM THEN  ISNULL(MinKMRateAC,0) + ((@ApproxKM - ISNULL(MinKMAC,0)) * ISNULL(ExtKmRateAC,0))
			ELSE ISNULL(MinKMRateAC,0) END),
			
			@F_NonAC=
			(CASE 
			WHEN ISNULL(MinKMNonAC,0) > @ApproxKM THEN ISNULL(MinKMRateNonAC,0) 
			WHEN ISNULL(MinKMNonAC,0) < @ApproxKM THEN  ISNULL(MinKMRateNonAC,0) + ((@ApproxKM - ISNULL(MinKMNonAC,0)) * ISNULL(ExtKmRateNonAC,0))
			ELSE ISNULL(MinKMRateNonAC,0) END)			
			FROM UT_Rate
			WHERE ServiceTypeID = @ServiceTypeID AND VehicleTypeID = @VehTypeID AND IsActive = 1
			--EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=3
			PRINT @ServiceTypeID
			PRINT '@@ServiceTypeID'
			SET @Discount=0
			
			IF( @ReqDateTime BETWEEN '4:00 AM' AND '7:59 AM' AND @VehTypeID IN (29)) AND @ServiceTypeID = 17
			BEGIN
				SET @Discount = 150
				PRINT 'd- @Discount '+convert(varcHAR,@Discount)
			END 
			ELSE IF( @ReqDateTime BETWEEN '4:00 AM' AND '7:59 AM' AND @VehTypeID IN (42)) AND @ServiceTypeID = 17
			BEGIN
				SET @Discount = 50
				PRINT '@Discount '+convert(varcHAR,@Discount)
			END  
			ELSE IF( @ReqDateTime BETWEEN '5:00 PM' AND '11:59 PM' AND @VehTypeID IN (29)) AND @ServiceTypeID = 18
			BEGIN
				SET @Discount = 100
				PRINT '@Discount '+convert(varcHAR,@Discount)
			END 
			ELSE IF( @ReqDateTime BETWEEN '5:00 PM' AND '11:59 PM' AND @VehTypeID IN (42)) AND @ServiceTypeID = 18
			BEGIN
				SET @Discount = 50
				PRINT '@Discount '+convert(varcHAR,@Discount)
			END 
			PRINT '@Discount'
			PRINT @Discount
			
			SELECT @GMinFareAC = 0,@GMinFareNAC=0
			IF EXISTS(SELECT TOP 1 ID FROM DC_MinFare WHERE VehicleTypeID=@VehTypeID AND  ServiceTypeID=@ServiceTypeID AND IsActive=1)
			BEGIN
				SELECT TOP 1 @GMinFareAC = Fare 
				FROM DC_MinFare (NOLOCK)
				WHERE VehicleTypeID=@VehTypeID AND AcTypeID = 1 AND ServiceTypeID=@ServiceTypeID AND IsActive=1

				SELECT TOP 1 @GMinFareNAC = Fare 
				FROM DC_MinFare (NOLOCK)
				WHERE VehicleTypeID=@VehTypeID AND AcTypeID = 2 AND ServiceTypeID=@ServiceTypeID AND IsActive=1
			END

			 --EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=3
			IF @GMinFareAC > 0
			BEGIN
				print '@GMinFareAC > 0 ' 
				IF @F_AC > @GMinFareAC AND @Discount > 0
				BEGIN
					SELECT @DiffAmt = @F_AC - @GMinFareAC
					print '@F_AC'+convert(varchar,@F_AC)+'@GMinFareAC'+convert(varchar,@GMinFareAC)+  '@Discount '+convert(varchar,@Discount)+  '@DiffAmt '+convert(varchar,@DiffAmt)
					IF @DiffAmt > @Discount
					BEGIN
						print '@DiffAmt > @Discount'
						SELECT @F_AC = @F_AC - @Discount
					END
					ELSE
					BEGIN
						SELECT @F_AC = @F_AC - @DiffAmt
					END
				END
				ELSE IF @F_AC < @GMinFareAC
				BEGIN
					print '@@F_AC > @@GMinFareAC'
					SELECT @F_AC = @GMinFareAC,@Discount=0
				END
				ELSE
				BEGIN
					print 'Case 1 Else ' 
					SELECT @F_AC= @F_AC - @Discount 
				END
			END
			ELSE
			BEGIN
				print '@F_AC > @Discount -- ELSE'
				print @Discount
				PRINT @VehTypeID
				SELECT @F_AC= @F_AC - @Discount 
			END
			--EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=3

			IF @GMinFareNAC > 0
			BEGIN
				IF @F_NonAC > @GMinFareNAC AND @Discount > 0
				BEGIN
					SELECT @DiffAmt =0,@DiffAmt = @F_NonAC - @GMinFareNAC
					IF @DiffAmt > @Discount
					BEGIN
						SELECT @F_NonAC = @F_NonAC - @Discount
					END
					ELSE
					BEGIN
						SELECT @F_NonAC = @F_NonAC - @DiffAmt
					END
				END
				ELSE IF @F_NonAC < @GMinFareNAC
				BEGIN
					SELECT @F_NonAC = @GMinFareNAC,@Discount=0
				END
			END
			ELSE
			BEGIN
				SELECT @F_NonAC = @F_NonAC - @Discount
			END

			UPDATE DC_KMFareGenerate
			SET ACFare = @F_AC,NonACFare=@F_NonAC,Discount=@Discount
			WHERE VehicleTypeID = @VehTypeID AND RequestID = @RequestID
			
			SET @I += 1 
		END
	END	
	
	ELSE IF @Flag = 44 -- Choose Vehicle Type 
	BEGIN
		BEGIN TRY
		 BEGIN TRANSACTION 	
				IF EXISTS(SELECT RequestID FROM DC_BookingRequest WHERE RequestID = @RequestID)
				BEGIN
			
					SELECT @VehTypeID =VehicleTypeID
					FROM UT_Rate
					WHERE RateID = @RateID 					
				
					UPDATE DC_BookingRequest
					SET RateID=@RateID ,ACrNAC=@AcTypeID,VehTypeID=@VehTypeID 
					WHERE RequestID = @RequestID
							
					IF @AcTypeID = 1
					BEGIN
						UPDATE DC_BookingRequest
						SET RateID=@RateID ,ACFare = @MinRate
						WHERE RequestID = @RequestID
					END
					ELSE IF @AcTypeID = 2
					BEGIN
						UPDATE DC_BookingRequest
						SET RateID=@RateID ,NonACFare = @MinRate
						WHERE RequestID = @RequestID
					END
					
					SELECT @RequestID
				END
				ELSE
				BEGIN
					SELECT 0
				END
		 COMMIT  
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			ROLLBACK
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
			SELECT 0
		END CATCH
	END	
	
	
	ELSE IF @Flag = 45 -- View Request with fixed generated fare.
	BEGIN
		BEGIN TRY
			
			--EXEC USP_DC_Home_CreateRequest 35,9
			
			--SELECT @RateID=RateID ,@ServiceNameID=ServiceNameID
			--FROM DC_BookingRequest
			--WHERE RequestID = @RequestID
			
			SELECT 
				@ServiceTypeID=ServiceTypeID ,@BranchID=81,@FromLocationID=L.MainAreaID,@ToLocationID=L2.MainAreaID,
				@ServiceNameID  = DR.ServiceNameID,@SID=ServiceTypeID,
				@NoOfDays = DR.NoOfDays  ,@ReqDateTime=DR.ReqDateTime ,@RateID=RateID 
			FROM 
				DC_BookingRequest DR
			INNER JOIN
				Utaxi_Location L ON DR.FromLocationID = L.AreaID
			INNER JOIN
				Utaxi_Location L2 ON DR.ToLocationID = L2.AreaID
			WHERE 
				RequestID = @RequestID				
			
				SELECT * INTO #UT_Rate1 FROM UT_Rate WHERE RateID = @RateID
		--	SELECT * INTO #Utaxi_Rate FROM Ut_Rate WHERE RateID = @RateID
			
				SELECT @VehTypeID=VehicleTypeID
				FROM #UT_Rate1
				WHERE RateID = @RateID
				
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,		
				ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,				
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				'0' AS RatePAC ,'0'  AS RatePNonAC ,
				CONVERT(DECIMAL(18,0),R.ApproxKM)  AS ApproxKM,R.ApproxKMText AS ApproxKMText,				
				CONVERT(DECIMAL(18,0),GFC.ACFare) AS RateAC, CONVERT(DECIMAL(18,0),GFC.NonACFare) AS RateNonAC,
				GFC.Discount,ISNULL(R.ACrNAC,0) AS ACrNAC ,
				RS.RatePerKM_AC,RS.RatePerKM_NAC,VT.AC AS ACAvailableID,VT.NonAC AS NonACAvailableID, RS.pkgExtHrRateNAC, RS.pkgExtHrRateAC				 				
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #UT_Rate1 RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID					
				LEFT JOIN DC_KMFareGenerate GFC ON R.RequestID=GFC.RequestID AND GFC.VehicleTypeID = @VehTypeID
				WHERE R.RequestID = @RequestID
				ORDER BY VT.OrderBy 
		END TRY
		BEGIN CATCH
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH	
		
		DROP TABLE 	#UT_Rate1	
	END
	
	
	ELSE IF @Flag = 46
		BEGIN
				SELECT @RequestID=(CASE @RequestID WHEN 0 THEN NULL ELSE @RequestID END)
		
				SELECT * INTO #MustSeePlaces1
				FROM Utaxi_MustSeePlaces
				--WHERE PlaceID = ISNULL(@RequestID,PlaceID) AND PlaceID < 50  -- 15 --AND ZoneID= ISNULL(@ZoneID,ZoneID) AND StateID= ISNULL(@StateID,StateID) AND DistrictID= ISNULL(@DistrictID,DistrictID)
				
				 SELECT Z.ZoneName, S.StateName, D.DistrictName, MS.PlaceName,
				 LEFT(MS.PlaceDescription,60) AS PlaceDescription,MS.PlaceDescription AS Description, MS.PlaceID, MS.IsActive,
				 E.EMPName AS CreatedBy ,E1.EMPName AS ModifiedBy,
				 CONVERT(NVARCHAR(20),MS.CreatedOn,105) AS CreatedDate,MS.CreatedOn AS CreatedTime,
				 CONVERT(NVARCHAR(20),MS.ModifiedOn,105) AS ModifiedDate,MS.ModifiedOn AS ModifiedTime,
				 MS.Opening,MS.Closing,MS.EntryFee,MS.BestTimetoVisit,
				 MS.PlaceImage1,MS.PlaceImage2,MS.PlaceImage3,MS.PlaceImage4,1500 AS Rate 
				 FROM #MustSeePlaces1 MS
				 INNER JOIN Utaxi_ZoneMaster Z ON Z.ZoneID = MS.ZoneID
				 INNER JOIN Utaxi_StateMaster S ON S.StateID = MS.StateID
				 INNER JOIN Utaxi_DistrictMaster D ON D.DistrictID = MS.DistrictID
				 LEFT JOIN Utaxi_Employee E ON MS.CreatedBy =E.EmpID
				 LEFT JOIN Utaxi_Employee E1 ON MS.ModifiedBy =E1.EmpID
				 --LEFT JOIN DC_PackageType PT ON PT.PackageTypeID =MS.PackageTypeID
				 WHERE MS.PageID=@PageID
				DROP TABLE #MustSeePlaces1
		END	
	
	ELSE IF @Flag = 47
		BEGIN			
			SELECT P.PageName,P.ServiceNameID,P.ServiceTypeID,P.PickupID,P.DropID,P.CreatedBy,
			L.AreaName AS PickupPlace, L1.AreaName AS DropPlace
			FROM DC_PageConfig P		
			INNER JOIN Utaxi_Location L ON L.AreaID = P.PickupID	
			INNER JOIN Utaxi_Location L1 ON L1.AreaID = P.DropID	
			WHERE P.PageName = @Keyword			
		END 
		
	ELSE IF @Flag = 48
		BEGIN		
			SELECT * INTO #MustSeePlacesGroup
			FROM Utaxi_MustSeePlaces
			WHERE PlaceID IN (SELECT MustSeePlaceID FROM DC_PackageGroupping WHERE PackageConfigID = @RequestID)
							
			 SELECT Z.ZoneName, S.StateName, D.DistrictName, MS.PlaceName,
			 LEFT(MS.PlaceDescription,60) AS PlaceDescription,MS.PlaceDescription AS Description, MS.PlaceID, MS.IsActive,
			 E.EMPName AS CreatedBy ,E1.EMPName AS ModifiedBy,
			 CONVERT(NVARCHAR(20),MS.CreatedOn,105) AS CreatedDate,MS.CreatedOn AS CreatedTime,
			 CONVERT(NVARCHAR(20),MS.ModifiedOn,105) AS ModifiedDate,MS.ModifiedOn AS ModifiedTime,
			 NULL AS PackageType ,MS.Opening,MS.Closing,MS.EntryFee,MS.BestTimetoVisit,
			 MS.PlaceImage1,MS.PlaceImage2,MS.PlaceImage3,MS.PlaceImage4,1500 AS Rate 
			 FROM #MustSeePlacesGroup MS
			 INNER JOIN Utaxi_ZoneMaster Z ON Z.ZoneID = MS.ZoneID
			 INNER JOIN Utaxi_StateMaster S ON S.StateID = MS.StateID
			 INNER JOIN Utaxi_DistrictMaster D ON D.DistrictID = MS.DistrictID
			 LEFT JOIN Utaxi_Employee E ON MS.CreatedBy =E.EmpID
			 LEFT JOIN Utaxi_Employee E1 ON MS.ModifiedBy =E1.EmpID
			
			DROP TABLE #MustSeePlacesGroup
		END	
	
	ELSE IF @Flag = 49 -- View Request 
	BEGIN
		BEGIN TRY 
				--EXEC USP_DC_Home_CreateRequest @Flag = 49,@RequestID=17 
			 
				SELECT 
					@ServiceTypeID=ServiceTypeID ,@BranchID=81,@FromLocationID=L.MainAreaID,@ToLocationID=L2.MainAreaID,
					@ServiceNameID  = DR.ServiceNameID,@SID=ServiceTypeID,
					@NoOfDays = DR.NoOfDays  ,@ReqDateTime=DR.ReqTime ,@RateID=RateID 
				FROM 
					DC_BookingRequest DR
				INNER JOIN
					Utaxi_Location L ON DR.FromLocationID = L.AreaID
				INNER JOIN
					Utaxi_Location L2 ON DR.ToLocationID = L2.AreaID
				WHERE 
					RequestID = @RequestID				
				
				SELECT * INTO #Utaxi_Rate_New FROM Utaxi_Rate WHERE RateID = @RateID 
				
				SELECT @VehTypeID=VehicleTypeID ,@Discount=0
				FROM #Utaxi_Rate_New
				WHERE RateID = @RateID
				
				PRINT @ReqDateTime
				
				IF( @ReqDateTime BETWEEN '4:00 AM' AND '7:45 AM' AND @VehTypeID IN (29,42)) AND @ServiceTypeID = 17
				BEGIN
					SET @Discount = 150
 				END 
				
				IF( @ReqDateTime BETWEEN '5:00 PM' AND '11:45 PM' AND @VehTypeID IN (29,42)) AND @ServiceTypeID = 18
				BEGIN
					SET @Discount = 100
				END 
		   
				UPDATE DC_BookingRequest SET Discount = @Discount WHERE RequestID = @RequestID	
				
				
				
				IF @ServiceNameID = 3
				BEGIN
						--EXEC @RequestID 
						
					--	EXEC USP_DC_Home_CreateRequest @Flag = 19,@RequestID=@RequestID
						
						 
						
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				
				(CASE RS.VehicleTypeID WHEN 29 THEN '250' ELSE '300' END) AS MinKmAC,
				(CASE RS.VehicleTypeID WHEN 29 THEN '250' ELSE '300' END) AS MinKMNAC, 	
				ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
				RS.RateAC - @Discount AS RateAC, RS.RateNonAC - @Discount AS RateNonAC,
				(CASE RS.RateAC  WHEN '' then '0'  WHEN NULL then '0' ELSE RS.RateAC END)AS RatePerKM_AC,
				(CASE RS.RateNonAC  WHEN '' then '0'  WHEN NULL then '0' ELSE RS.RateNonAC END)AS RatePerKM_NAC, 
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				'0' AS RatePAC ,'0'  AS RatePNonAC ,
				CONVERT(DECIMAL(18,0),R.ApproxKM)  AS ApproxKM,R.ApproxKMText AS ApproxKMText , @Discount AS Discount				
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #Utaxi_Rate_New RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
				WHERE R.RequestID = @RequestID  
				END	
				
			ELSE IF @ServiceNameID = 2
			BEGIN				
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,		
				ISNULL(RS.RateAC,'0') AS MinKMRateAC ,ISNULL(RS.RateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
				ISNULL(RS.RatePAC,'0') AS RateAC, ISNULL(RS.RatePNonAC,'0') AS RateNonAC,
				ISNULL(RS.RateAC,'0') AS RatePerKM_AC,ISNULL(RS.RateNonAC,0) AS RatePerKM_NAC,
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				ISNULL(RS.RatePAC,'0')  AS RatePAC ,ISNULL(RS.RatePNonAC,'0')  AS RatePNonAC 
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #Utaxi_Rate_New RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
				WHERE R.RequestID = @RequestID
			END
			
				ELSE
				BEGIN 
				SELECT R.RequestID,SN.TypeID AS ServiceNameID,SN.ServiceName,ST.ID AS ServiceTypeID,ST.ServiceType,
				R.RequestRefNO,L.AreaID AS FromLocationID,
				L.AreaName AS FromLocation,L1.AreaID AS ToLocationID,L1.AreaName AS ToLocation ,
				CONVERT(NVARCHAR(20),R.ReqDateTime,101) AS ReqDate,R.ReqTime,VT.VName AS VehicleType,
				ISNULL(RS.MinKmAC,0) AS MinKmAC ,ISNULL(RS.MinKmNonAC,0) AS MinKMNAC,		
				ISNULL(RS.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(RS.MinKMRateNonAC,0) AS MinKMRateNAC,
				ISNULL(RS.ExtKmRateAC,0) AS ExtKmRateAC,ISNULL(RS.ExtKmRateNonAC,0) AS ExtraKMRateNAC,
				ISNULL(RS.ExtHrRateAC,0) AS ExtHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
				R.VehTypeID AS VehicleType ,R.ServiceTypeID AS ServiceType,R.RateID,
				ISNULL(RS.DayBata,0) AS DayBata,ISNULL(RS.NightBata,0) AS NightBata,
				(CASE CP.KAR WHEN 0 THEN 0 ELSE RS.KarnatakaCp END) AS KarnatakaCp,
				(CASE CP.KER WHEN 0 THEN 0 ELSE RS.KeralaCP END) AS KeralaCP,
				(CASE CP.GOA WHEN 0 THEN 0 ELSE RS.GoaCp END) AS GoaCp,			
				(CASE CP.TN WHEN 0 THEN 0 ELSE RS.TNCp END) AS TNCp,
				(CASE CP.AP WHEN 0 THEN 0 ELSE RS.APCp END) AS APCp,
				(CASE CP.PON WHEN 0 THEN 0 ELSE RS.PondicherryCp END) AS PondicherryCp,
				ACrNAC,PaymnetTypeID,	
				ISNULL(R.Toll,0) AS Toll,ISNULL(R.Parking,0) AS Parking,ISNULL(R.Carrier,0) AS Carrier,ISNULL(R.MiddlePickup,0) AS MiddlePickup,
				ISNULL(R.PaidAmount,0) AS PaidAmount,ISNULL(R.Discount,0) AS Discount,ISNULL(R.Balance,0) AS Balance,
				ISNULL(R.TotalTripFare	,0) AS TotalTripFare,ISNULL(R.MinRate,0) AS MinRate	,
				RS.VehicleTypeID ,VT.Passenger,VT.AC,VT.NonAC,
				(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
				ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
				RS.RateAC - @Discount AS RateAC, RS.RateNonAC - @Discount AS RateNonAC,
				'0' AS RatePerKM_AC,'0' AS RatePerKM_NAC,
				RS.Comments	,CONVERT(NVARCHAR(20),R.TripEndDate,101)+SPACE(1)+CONVERT(NVARCHAR(10),CAST(R.TripEndDate AS Time),100)	 AS TripEndDate,
				ISNULL(R.NoOfDays,0) AS NoOfDays,ISNULL(R.NoOfNight,0) AS NoOfNight,
				'0' AS RatePAC ,'0'  AS RatePNonAC ,
				CONVERT(DECIMAL(18,0),R.ApproxKM)  AS ApproxKM,R.ApproxKMText AS ApproxKMText , @Discount AS Discount				
				FROM DC_BookingRequest R 
				INNER JOIN Utaxi_Location L ON R.FromLocationID = L.AreaID
				INNER JOIN Utaxi_Location L1 ON R.ToLocationID = L1.AreaID
				INNER JOIN Utaxi_ServiceName SN ON R.ServiceNameID = SN.TypeID
				INNER JOIN Utaxi_ServiceType ST ON R.ServiceTypeID = ST.ID	
				LEFT JOIN #Utaxi_Rate_New RS ON RS.RateID = @RateID
				LEFT JOIN Utaxi_VehicleType	VT ON RS.VehicleTypeID = VT.ID	
				LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID	
				WHERE R.RequestID = @RequestID 
				
				END
		END TRY
		BEGIN CATCH 
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
		END CATCH	
		
		DROP TABLE 	#Utaxi_Rate_New	
	END		



	ELSE IF @Flag =  50 --DC_BookingRequest
	BEGIN
		--SELECT * FROM DC_BookingRequest
		BEGIN TRY
		 BEGIN TRANSACTION 	
			
				SET @ServiceID = @ServiceTypeID			
			
			   IF EXISTS(SELECT RequestID FROM DC_BookingRequest WHERE RequestID = @RequestID )
				   BEGIN	
						SET @ServiceID = @ServiceTypeID
								  
						IF @ServiceNameID = 7 --Airport 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 17 WHEN 2 THEN 18 WHEN 3 THEN 19 ELSE 1 END)
							END
						ELSE IF @ServiceNameID = 6 --Railway Station 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 23 WHEN 2 THEN 24 WHEN 3 THEN 25 ELSE 1 END)
							END	
						ELSE IF @ServiceNameID = 5 --Railway Station 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 26 WHEN 2 THEN 27 WHEN 3 THEN 28 ELSE 1 END)
							END	
						ELSE 
							BEGIN
								SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 1 WHEN 3 THEN 4 ELSE @ServiceTypeID END)
							END			
					
						 IF @ServiceNameID = 3 
						   BEGIN 
								SELECT @NoOfDays=1,@NoOfNight=0
								IF ISNULL(@EndTime,'') <> ''
								BEGIN
									 SELECT @NoOfDays=datediff(day, @ReqDateTime, dateadd(minute, -1, @EndDateTime)+.5),	
									 @NoOfNight=datediff(day, @ReqDateTime - .5,dateadd(minute, -1, @EndDateTime)) 
								END 
						   END
						
				
						UPDATE DC_BookingRequest
						SET ServiceNameID=@ServiceNameID,ServiceTypeID=@ServiceTypeID,
						FromLocationID=@FromLocationID,ToLocationID=@ToLocationID,ReqDateTime=@ReqDateTime,ReqTime=@ReqTime,
						TripEndDate=@EndDateTime,NoOfDays=@NoOfDays,NoOfNight=@NoOfNight,ServiceID=@ServiceID
						WHERE RequestID = @RequestID
				   
						SELECT @RequestID
				   END
			   ELSE
				  BEGIN	
			
				--SET @ServiceID = @ServiceTypeID
				
				IF @ServiceNameID = 7 --Airport 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 17 WHEN 2 THEN 18 WHEN 3 THEN 19 ELSE 1 END)
					END
				ELSE IF @ServiceNameID = 6 --Railway Station 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 23 WHEN 2 THEN 24 WHEN 3 THEN 25 ELSE 1 END)
					END	
				ELSE IF @ServiceNameID = 5 --Railway Station 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 26 WHEN 2 THEN 27 WHEN 3 THEN 28 ELSE 1 END)
					END	
				ELSE 
					BEGIN
						SELECT @ServiceTypeID=(CASE @ServiceTypeID WHEN 1 THEN 1 WHEN 3 THEN 4 ELSE @ServiceTypeID END)
					END			
			
				SELECT @TotalTransaction = ISNULL(COUNT(*),0)+1 
				FROM DC_BookingRequest 
				WHERE CreatedOn BETWEEN CONVERT(NVARCHAR(20),GETDATE(),101) AND CONVERT(NVARCHAR(20),GETDATE()+1,101)
				
			   SELECT @C_Year=CONVERT(VARCHAR(MAX),(( YEAR( GETDATE() ) % 100 ))),
			   @C_Month=RIGHT('00' + CAST(CONVERT(VARCHAR(MAX),(DATEPART(MM, GETDATE()))) AS VARCHAR(2)),2),
			   @C_Date=RIGHT('00' + CAST(CONVERT(VARCHAR(MAX),(DATEPART(DD, GETDATE()))) AS VARCHAR(2)),2),
			   @TotalTransaction_=RIGHT('000' + CAST(@TotalTransaction AS VARCHAR(3)), 3) 
			
			   SELECT @BookingRequestRefNO ='BR'+@C_Year+@C_Month+@C_Date+@TotalTransaction_	
			   
			   IF @ServiceNameID = 3
			   BEGIN
					SELECT @NoOfDays=1,@NoOfNight=0
					IF ISNULL(@EndTime,'') <> ''
					BEGIN
							SELECT @NoOfDays=datediff(day, @ReqDateTime, dateadd(minute, -1, @EndDateTime)+.5),	
							@NoOfNight=datediff(day, @ReqDateTime - .5,dateadd(minute, -1, @EndDateTime)) 
					END 
			   END

			   IF @ServiceTypeID = 19 OR  @ServiceTypeID = 4
			   BEGIN
					SET @Keyword = 'KM'+CONVERT(VARCHAR,@KMValue)
					SET @KMValue = @KMValue * 2 
			   END
			
			   SET @VehTypeID = 1			
			   INSERT INTO DC_BookingRequest(RequestRefNO,ServiceNameID,ServiceTypeID,FromLocationID,ToLocationID,ReqDateTime,VehTypeID,ReqTime,
			   TripEndDate,NoOfDays,NoOfNight,ServiceID,ApproxKM,Comments)
			   VALUES(@BookingRequestRefNO,@ServiceNameID,@ServiceTypeID,@FromLocationID,@ToLocationID,@ReqDateTime,@VehTypeID,@ReqTime,
			   @EndDateTime,@NoOfDays,@NoOfNight,@ServiceID,CONVERT(DECIMAL(18,0),@KMValue),@Keyword) 
			   			
			   SELECT @RequestID = @@IDENTITY	
			   
			 
			--EXEC USP_DC_Home_CreateRequest @Flag = 34, @RequestID=36
			--	SELECT @FromLocationID=953,@ToLocationID=565,@BranchID=81,@ServiceTypeID=18
			
			--DECLARE @pkgMinRateAC NVARCHAR(700)=NULL,@pkgExtKMRateAC NVARCHAR(50)=NULL,@pkgExtHrRateAC NVARCHAR(700)=NULL
			--DECLARE @pkgMinRateNAC NVARCHAR(700)=NULL,@pkgExtKMRateNAC NVARCHAR(700)=NULL,@pkgExtHrRateNAC NVARCHAR(700)=NULL
			
						
			SELECT @ServiceTypeID=ServiceTypeID ,@BranchID=81,@KMValue=ApproxKM,@ReqDateTime=ReqTime,@ServiceNameID = ServiceNameID
			FROM DC_BookingRequest
			WHERE RequestID = @RequestID			
			
			IF @ServiceTypeID <> 4
			BEGIN
				EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=@RequestID,@ServiceTypeID=@ServiceTypeID,@KMValue=@KMValue,@ReqDateTime=@ReqDateTime
			END
			ELSE 
			BEGIN
				EXEC USP_DC_Home_CreateRequest @Flag = 52,@RequestID=@RequestID,@ServiceTypeID=@ServiceTypeID,@KMValue=@KMValue,@ReqDateTime=@ReqDateTime
			END
		
			--SELECT * FROM Utaxi_Rate where ServiceTypeID=2

			--IF @ServiceNameID = 2
			--BEGIN
			--	SELECT @pkgMinRateAC = RateAC,@pkgExtKMRateAC=ExtKmRateAC,@pkgExtHrRateNAC=ExtHrRateAC,
			--		   @pkgMinRateNAC = RateNonAC,@pkgExtKMRateAC=ExtKmRateAC,@pkgExtHrRateNAC=ExtHrRateAC
			--	FROM Utaxi_Rate
			--	WHERE ServiceTypeID = @ServiceTypeID
			--END
			
			
			SELECT (CASE VT.ID WHEN 29 THEN 'Hatchback (4+1)' WHEN 42 THEN 'Sedan (4+1)' ELSE VT.VName END) AS VehicleType,CB.CarBodyType,
			VT.VehicleBodyTypeID,R.VehicleTypeID,					
			ISNULL(R.MinKmAC,0) AS MinKMAC ,ISNULL(R.MinKmNonAC,0) AS MinKMNAC,ISNULL(R.MinKMRateAC,0) AS MinKMRateAC ,ISNULL(R.MinKMRateNonAC,0) AS MinKMRateNAC,
			ISNULL(R.ExtKmRateAC,0) AS ExtraKMRateAC,ISNULL(R.ExtKmRateNonAC,0) AS ExtraKMRateNAC,ISNULL(R.ExtHrRateAC,0) AS ExtraHrRateAC,ISNULL(ExtHrRateNonAC,0) AS ExtraHrRateNAC,			
			R.ServiceTypeID AS ServiceType,R.RateID,R.BranchID,R.Comments ,ISNULL(R.DayBata,0) AS DayBata,ISNULL(R.NightBata,0) AS NightBata,
			(CASE CP.KAR WHEN 0 THEN 0 ELSE R.KarnatakaCp END) AS KarnatakaCp,
			(CASE CP.KER WHEN 0 THEN 0 ELSE R.KeralaCP END) AS KeralaCP,
			(CASE CP.GOA WHEN 0 THEN 0 ELSE R.GoaCp END) AS GoaCp,			
			(CASE CP.TN WHEN 0 THEN 0 ELSE R.TNCp END) AS TNCp,
			(CASE CP.AP WHEN 0 THEN 0 ELSE R.APCp END) AS APCp,
			(CASE CP.PON WHEN 0 THEN 0 ELSE R.PondicherryCp END) AS PondicherryCp,
			VT.Passenger,VT.AC,VT.NonAC,
			(CASE VT.VehicleBodyTypeID WHEN 1 THEN '2' ELSE '4' END) AS Suitcases,
			ISNULL(ST.MiniHR,0) AS MiniHR,ST.Type,
			ISNULL(R.RatePerKM_AC,0) AS RatePerKM_AC,ISNULL(R.RatePerKM_NAC,0) AS RatePerKM_NAC	,
			CONVERT(DECIMAL(18,0),FG.ACFare) AS FG_AC, CONVERT(DECIMAL(18,0),FG.NonACFare) AS FG_NonAC,
			FG.ApproxKM	,CONVERT(DECIMAL(18,0),FG.Discount) AS OfferDiscount, R.pkgExtHrRateAC,R.pkgExtHrRateNAC,
			@RequestID AS RequestID					
			FROM UT_Rate R 
			INNER JOIN Utaxi_VehicleType VT ON R.VehicleTypeID=VT.ID AND VT.IsActive=1
			LEFT JOIN Utaxi_CarBody CB ON VT.VehicleBodyTypeID = CB.CarBodyID			
			LEFT JOIN Utaxi_ServiceType ST ON R.ServiceTypeID=ST.ID AND ST.IsActive=1
			LEFT JOIN Utaxi_Employee E ON R.CreatedBy=E.EmpID 
			LEFT JOIN Utaxi_BranchMaster B ON R.BranchID=B.BranchID 
			LEFT JOIN DC_Cp_Place CP ON CP.RequestID=@RequestID
			INNER JOIN DC_KMFareGenerate FG ON R.VehicleTypeID=FG.VehicleTypeID AND FG.RequestID =  @RequestID
			WHERE R.IsActive = 1 AND R.ServiceTypeID = @ServiceTypeID
			ORDER BY	VT.OrderBy 
		 END  	
		 COMMIT  
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			ROLLBACK
			INSERT INTO UT_ErrorLog(FlagValue,SPName,ErrorMessage)
			SELECT @Flag,OBJECT_NAME(@@PROCID),ERROR_MESSAGE()
			SELECT 0
		END CATCH
	END

	ELSE IF @Flag =  51 --DC_BookingRequest
	BEGIN
		SELECT DISTINCT L1.AreaAddress AS PickupAdd,L2.AreaAddress AS DropAdd
		FROM Utaxi_Location L 
		INNER JOIN Utaxi_Location L1 ON L1.AreaID = @FromLocationID
		INNER JOIN Utaxi_Location L2 ON L2.AreaID = @TolocationID
		WHERE L1.IsActive = 1 AND L2.IsActive = 1
	END

	ELSE IF @Flag = 52-- Fare Generation Out Station
	BEGIN
		--EXEC USP_DC_Home_CreateRequest @Flag = 43,@RequestID=3530,@ServiceTypeID=17,@KMValue=47
		
 		DELETE FROM DC_KMFareGenerate WHERE CreatedOn < CONVERT(NVARCHAR(20),GETDATE(),101)
		
		IF EXISTS(SELECT FareID FROM DC_KMFareGenerate WHERE RequestID = @RequestID)
		BEGIN
			DELETE FROM DC_KMFareGenerate WHERE RequestID = @RequestID
		END   
		
		SELECT @NoOfDays=ISNULL(NoOfDays,1) 
		FROM DC_BookingRequest 
		WHERE RequestID = @RequestID

		INSERT INTO DC_KMFareGenerate(VehicleTypeID,RequestID,ApproxKM)
		SELECT DISTINCT VehicleTypeID, @RequestID,@KMValue
		FROM UT_Rate
		WHERE ServiceTypeID = @ServiceTypeID AND IsActive = 1
		
		DECLARE @FareGOUT TABLE(ID INT IDENTITY(1,1),VehicleTypeID INT,KM DECIMAL(18,2))
		INSERT INTO @FareGOUT(VehicleTypeID,KM)
		SELECT DISTINCT VehicleTypeID,@KMValue
		FROM UT_Rate
		WHERE ServiceTypeID = @ServiceTypeID  AND IsActive = 1
		--ORDER BY CreatedOn DESC
				
		SELECT @Count =0,@RowID =1,@I =1,@F_AC =0,@F_NonAC =0,@ApproxKM =0, @Discount=0
		SELECT @Count=COUNT(ID) FROM @FareGOUT
		WHILE(@I <= @Count)
		BEGIN
			SELECT @VehTypeID = VehicleTypeID,@ApproxKM=ISNULL(KM,250)
			FROM @FareGOUT
			WHERE ID = @I
			
			--SELECT TOP 1 
			--@F_AC=(CASE WHEN ISNULL(RatePerKM_AC,0) > 0 THEN ISNULL(RatePerKM_AC,0) * ISNULL(MinKmAC,0) + ISNULL(DayBata,0) ELSE 0 END),
			--@F_NonAC=(CASE WHEN ISNULL(RatePerKM_NAC,0) > 0 THEN ISNULL(RatePerKM_NAC,0) * ISNULL(MinKmNonAC,0) + ISNULL(DayBata,0) ELSE 0 END) 		
			--FROM UT_Rate
			--WHERE ServiceTypeID = @ServiceTypeID AND VehicleTypeID = @VehTypeID AND IsActive = 1 

			SELECT TOP 1 
			@F_AC=(CASE WHEN ISNULL(RatePerKM_AC,0) > 0 THEN ISNULL(RatePerKM_AC,0) * ISNULL(@ApproxKM,0) + ISNULL(DayBata,0) ELSE 0 END),
			@F_NonAC=(CASE WHEN ISNULL(RatePerKM_NAC,0) > 0 THEN ISNULL(RatePerKM_NAC,0) * ISNULL(@ApproxKM,0) + ISNULL(DayBata,0) ELSE 0 END) 		
			FROM UT_Rate
			WHERE ServiceTypeID = @ServiceTypeID AND VehicleTypeID = @VehTypeID AND IsActive = 1 
			
			--IF( @ReqDateTime BETWEEN '4:00 AM' AND '7:59 AM' AND @VehTypeID IN (29)) AND @ServiceTypeID = 17
			--BEGIN
			--	SET @Discount = 150
			--END 
			--ELSE IF( @ReqDateTime BETWEEN '4:00 AM' AND '7:59 AM' AND @VehTypeID IN (42)) AND @ServiceTypeID = 17
			--BEGIN
			--	SET @Discount = 50
			--END  
			--ELSE IF( @ReqDateTime BETWEEN '5:00 PM' AND '11:59 PM' AND @VehTypeID IN (29)) AND @ServiceTypeID = 18
			--BEGIN
			--	SET @Discount = 100
			--END 
			--ELSE IF( @ReqDateTime BETWEEN '5:00 PM' AND '11:59 PM' AND @VehTypeID IN (42)) AND @ServiceTypeID = 18
			--BEGIN
			--	SET @Discount = 50
			--END 
			

			--SELECT @GMinFareAC = 0,@GMinFareNAC=0
			--IF EXISTS(SELECT TOP 1 ID FROM DC_MinFare WHERE VehicleTypeID=@VehTypeID AND  ServiceTypeID=@ServiceTypeID AND IsActive=1)
			--BEGIN
			--	SELECT TOP 1 @GMinFareAC = Fare 
			--	FROM DC_MinFare (NOLOCK)
			--	WHERE VehicleTypeID=@VehTypeID AND AcTypeID = 1 AND ServiceTypeID=@ServiceTypeID AND IsActive=1

			--	SELECT TOP 1 @GMinFareNAC = Fare 
			--	FROM DC_MinFare (NOLOCK)
			--	WHERE VehicleTypeID=@VehTypeID AND AcTypeID = 2 AND ServiceTypeID=@ServiceTypeID AND IsActive=1
			--END

			--IF @GMinFareAC > 0
			--BEGIN
			--	IF @F_AC > @GMinFareAC AND @Discount > 0
			--	BEGIN
			--		SELECT @DiffAmt = @F_AC - @GMinFareAC
			--		IF @DiffAmt > @Discount
			--		BEGIN
			--			SELECT @F_AC = @F_AC - @Discount
			--		END
			--	END
			--	ELSE IF @F_AC < @GMinFareAC
			--	BEGIN
			--		SELECT @F_AC = @GMinFareAC,@Discount=0
			--	END
			--END
			--ELSE
			--BEGIN
			--	SELECT @F_AC= @F_AC - @Discount 
			--END


			--IF @GMinFareNAC > 0
			--BEGIN
			--	IF @F_NonAC > @GMinFareNAC AND @Discount > 0
			--	BEGIN
			--		SELECT @DiffAmt =0,@DiffAmt = @F_NonAC - @GMinFareNAC
			--		IF @DiffAmt > @Discount
			--		BEGIN
			--			SELECT @F_NonAC = @F_NonAC - @Discount
			--		END
			--	END
			--	ELSE IF @F_NonAC < @GMinFareNAC
			--	BEGIN
			--		SELECT @F_NonAC = @GMinFareNAC,@Discount=0
			--	END
			--END
			--ELSE
			--BEGIN
			--	SELECT @F_NonAC = @F_NonAC - @Discount
			--END

			UPDATE DC_KMFareGenerate
			SET ACFare =(@F_AC * @NoOfDays),NonACFare=(@F_NonAC *@NoOfDays),Discount=@Discount
			WHERE VehicleTypeID = @VehTypeID AND RequestID = @RequestID
			
			SET @I += 1 
		END
	END	
		
END

GO

