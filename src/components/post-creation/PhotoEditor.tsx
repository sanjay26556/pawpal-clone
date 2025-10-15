import type { FC } from 'react';
import { Box, Typography, Slider, Stack } from '@mui/material';

interface PhotoEditorProps {
  previewUrl?: string;
  brightness: number; // 0-200
  contrast: number;   // 0-200
  saturation: number; // 0-200
  onChange: (v: { brightness: number; contrast: number; saturation: number }) => void;
}

export const PhotoEditor: FC<PhotoEditorProps> = ({ previewUrl, brightness, contrast, saturation, onChange }) => {
  const filterCss = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Photo Editor</Typography>
      {previewUrl && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box component="img" src={previewUrl} alt="preview" sx={{ width: 280, height: 280, objectFit: 'cover', borderRadius: 2, filter: filterCss }} />
        </Box>
      )}
      <Stack spacing={2}>
        <Box>
          <Typography variant="caption">Brightness</Typography>
          <Slider min={0} max={200} value={brightness} onChange={(_, v) => onChange({ brightness: v as number, contrast, saturation })} />
        </Box>
        <Box>
          <Typography variant="caption">Contrast</Typography>
          <Slider min={0} max={200} value={contrast} onChange={(_, v) => onChange({ brightness, contrast: v as number, saturation })} />
        </Box>
        <Box>
          <Typography variant="caption">Saturation</Typography>
          <Slider min={0} max={200} value={saturation} onChange={(_, v) => onChange({ brightness, contrast, saturation: v as number })} />
        </Box>
      </Stack>
    </Box>
  );
};

export default PhotoEditor;


