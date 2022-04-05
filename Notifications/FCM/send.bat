curl -X POST ^
--header "Authorization: key={サーバーキー}" ^
--header "project_id: key={送信者ID}" ^
--header Content-Type:"application/json" ^
https://fcm.googleapis.com/fcm/send ^
-d @test.json
pause