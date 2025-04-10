export const extractDominantColor = (img) => {
    return new Promise((resolve) => {
        // Crear un canvas para analizar la imagen
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const processImage = () => {
            // Configurar canvas con dimensiones reducidas para mejor performance
            canvas.width = 50;
            canvas.height = 50;
            
            // Dibujar la imagen en el canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            try {
                // Obtener datos de píxeles
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                
                // Analizar colores para encontrar el dominante
                const colorCount = {};
                let maxCount = 0;
                let dominantColor = 'rgba(97, 32, 158, 0.7)'; // Color por defecto
                
                for (let i = 0; i < data.length; i += 16) { // Muestrear cada 4 píxeles
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const a = data[i + 3];
                    
                    // Ignorar píxeles transparentes o muy oscuros
                    if (a > 128 && (r + g + b) > 100) {
                        const color = `rgb(${r}, ${g}, ${b})`;
                        colorCount[color] = (colorCount[color] || 0) + 1;
                        
                        if (colorCount[color] > maxCount) {
                            maxCount = colorCount[color];
                            dominantColor = `rgba(${r}, ${g}, ${b}, 0.7)`;
                        }
                    }
                }
                
                resolve(dominantColor);
            } catch (error) {
                console.error('Error al procesar la imagen:', error);
                resolve('rgba(97, 32, 158, 0.7)'); // Color por defecto en caso de error
            }
        };

        if (img.complete) {
            processImage();
        } else {
            img.onload = processImage;
        }
    });
};