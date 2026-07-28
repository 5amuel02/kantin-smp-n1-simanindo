Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Users\Asus Tuf Gaming\.gemini\antigravity-ide\brain\90c9bb3b-164a-4661-b7e5-72760e78c96b"
$destDir = "d:\Project Website\Kantin SMP N 1 Simanindo\kantin-app\public"

# Rotate Nabati Coklat 90 degrees clockwise
$imgCoklat = [System.Drawing.Image]::FromFile("$srcDir\media__1784950768900.jpg")
$imgCoklat.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
$imgCoklat.Save("$destDir\nabaticoklat.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$imgCoklat.Dispose()
Write-Host "Rotated and saved nabaticoklat.jpg"

# Copy others
Copy-Item "$srcDir\media__1784950803171.png" -Destination "$destDir\nabatikeju.png" -Force
Copy-Item "$srcDir\media__1784950814329.png" -Destination "$destDir\nabatiaa.png" -Force
Copy-Item "$srcDir\media__1784950823974.png" -Destination "$destDir\bengbeng.png" -Force
Copy-Item "$srcDir\media__1784950835172.png" -Destination "$destDir\arden.png" -Force
Write-Host "Copied the rest of the images"
