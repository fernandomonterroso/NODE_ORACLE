SELECT 
		USER_ID
		, TIME_LOG_ID
        ,TO_CHAR(CREATE_DATE,'DD/MM/YYYY HH24:MI:SS') CREATE_DATE
		,TO_CHAR(CREATE_DATE,'YYYY-MM-DD') FECHA_MARCAJE
        --,'http://10.238.20.204:8089/sideima/'||FOTO FOTO
        ,B.NOMBRE
        ,APELLIDO
        ,B.CODEMP
        ,DPI
	  FROM 
	  dbo.USER_TIME_LOG@RELOJSQL A, cb1.v_empleados_combex B
	  WHERE  
		DEVICE_ID IN (62,66)
		AND AUTHORIZE_REASON_CODE = 'Access'
		AND TO_CHAR(CREATE_DATE,'YYYY-MM-DD')>=TO_CHAR(SYSDATE-12,'YYYY-MM-DD')
		--AND TRUNC(CREATE_DATE)>=TRUNC(SYSDATE)
		--AND TRUNC(CREATE_DATE)=TRUNC(SYSDATE)
		--AND regexp_replace(regexp_replace(CODEMP, '[^0-9]', ''),'0','',1,1)=USER_ID
	  ORDER BY TIME_LOG_ID DESC