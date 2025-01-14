
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Tab,
  Tabs,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AddPhotoAlternate, Save, Delete } from '@mui/icons-material';
import { useState } from 'react';

const ProductManagement = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      productName: '',
      description: '',
      price: '',
      stock: '',
      images: [],
    },
  });

  const [tabValue, setTabValue] = useState(0);
  const [imagePreview, setImagePreview] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file: any) => URL.createObjectURL(file));
    setImagePreview(previews);
    setValue('images', files);
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Content and Product Management
      </Typography>

      {/* Tabs for Categories */}
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Products" />
        <Tab label="Categories" />
        <Tab label="Settings" />
      </Tabs>

      {tabValue === 0 && (
        <Box mt={3}>
          <Grid container spacing={3}>
            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Product Details</Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                  <Controller
                    name="productName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Product Name"
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Stock"
                        type="number"
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  sx={{ mt: 3 }}
                >
                  Save Product
                </Button>
              </form>
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Product Images</Typography>
              <Box mt={2}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternate />}
                >
                  Upload Images
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleImageUpload}
                  />
                </Button>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  mt={3}
                  sx={{ maxHeight: 300, overflow: 'auto' }}
                >
                  {imagePreview.map((src, index) => (
                    <Card key={index} sx={{ maxWidth: 120 }}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={src}
                        alt={`Preview ${index}`}
                      />
                      <CardActions>
                        <IconButton
                          color="error"
                          onClick={() =>
                            setImagePreview((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Delete />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Other Tabs */}
      {tabValue === 1 && (
        <Box mt={3}>
          <Typography variant="h6">Manage Categories</Typography>
          <Typography variant="body1" mt={2}>
            Add, edit, or delete product categories.
          </Typography>
        </Box>
      )}
      {tabValue === 2 && (
        <Box mt={3}>
          <Typography variant="h6">Settings</Typography>
          <Typography variant="body1" mt={2}>
            Configure website and product management settings.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductManagement;
