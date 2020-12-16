from PIL import Image
from django.db import models
from django.urls import reverse


class Discount(models.Model):
    discount_rate = models.PositiveIntegerField(default=5)
    image = models.ImageField(upload_to='static/discount')

    def __str__(self):
        return f'{self.discount_rate}%'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.image:
            img = Image.open(self.image.path)

            width, height = img.size
            ratio = round(height / width)
            newheight = ratio * 300

            img = img.resize((500, 500), Image.ANTIALIAS)
            img.save(self.image.path)

    class Meta:
        verbose_name = verbose_name_plural = 'Discount'


class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, unique=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('sox_list_by_category', args=[self.slug])


class Sox(models.Model):
    category = models.ForeignKey(Category, related_name='products',
                                 on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    price = models.TextField()
    image = models.ImageField(upload_to='static/sox')
    fabrics = models.TextField()
    size = models.TextField()
    discount = models.ForeignKey(Discount, on_delete=models.CASCADE,
                                 blank=True, null=True, related_name='discount')

    class Meta:
        verbose_name = verbose_name_plural = 'Sox'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.image:
            img = Image.open(self.image.path)

            width, height = img.size
            ratio = round(height / width)
            newheight = ratio * 300

            img = img.resize((500, 500), Image.ANTIALIAS)
            img.save(self.image.path)

    def get_absolute_url(self):
        return reverse('sox_detail', args=[self.id])
