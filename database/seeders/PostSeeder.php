<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'title' => 'First Sample Post',
            'content' => 'This is the content of the first sample post.'
        ]);
        
        Post::create([
            'title' => 'Second Sample Post',
            'content' => 'This is the content of the second sample post.'
        ]);
        
        // Or create many using factory
        // Post::factory(10)->create();
    }
}