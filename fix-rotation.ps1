Add-Type -AssemblyName System.Drawing

$file = "d:\Project Website\Kantin SMP N 1 Simanindo\kantin-app\public\nabaticoklat.jpg"
$outFile = "d:\Project Website\Kantin SMP N 1 Simanindo\kantin-app\public\nabaticoklat_fix.jpg"

$img = [System.Drawing.Image]::FromFile($file)
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone)
$img.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()

Remove-Item $file -Force
Rename-Item $outFile -NewName "nabaticoklat.jpg"
Write-Host "Berhasil memutar 180 derajat!"
