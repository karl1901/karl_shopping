Write-Output "runing...";
git add *
$commitInfo = Read-Host 'please input commitInfo'
git commit -m $commitInfo
Write-Output "add commitInfo ok !";
git push
Write-Output "push ok !";
Pause