task :set_instagram_backgrounds, [:init_ninja, :the_ninja, :rhyme_index, :my_rhymes, :settings] => :environment do |t, args|

  def find_image(tag_name, max_id='', call_count=1)
    client_id = ENV['INSTAGRAM_ID']

    resp = Faraday.get "https://api.instagram.com/v1/tags/#{tag_name}/media/recent.json?client_id=#{client_id}#{max_id}"
    data = JSON.parse(resp.body)['data']
    first_image = data.detect{|d| d['type'] == 'image'}

    if first_image.nil?
      puts "No image this request (##{call_count}), trying again..."
      call_count++
      last_id = data.last['id']
      find_image(tag_name, "?max_tag_id=#{last_id}", call_count)
    else
      puts "background_image --> #{first_image['images']['standard_resolution']['url']}"
      puts "user --> #{first_image['user']['username']}"
      {
        background_image: first_image['images']['standard_resolution']['url'],
        user: first_image['user']['username']
      }
    end
  end

  def set_backgrounds(data)

  end

  [:init_ninja, :the_ninja, :rhyme_index, :my_rhymes, :settings].each do |page|
    set_backgrounds(find_image(args[page]))
  end
end