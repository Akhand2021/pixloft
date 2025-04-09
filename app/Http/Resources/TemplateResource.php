<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TemplateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'file_path' => $this->file_path,
            'preview_image' => $this->preview_image,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'collection' => new CollectionResource($this->whenLoaded('collection')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
