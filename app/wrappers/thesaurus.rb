class Thesaurus
  attr_accessor :data, :matches

  def self.fetch_data(word)
    data = Faraday.get "http://words.bighugelabs.com/api/2/#{ENV['THESAURUS_KEY']}/#{word}/json"
    handle_errors
    matches
  end

private
  def self.handle_errors
    case data.status
      when 200 then parse_data
      when 404 then matches = []
      when 303 then fetch_related_word
      when 500 then matches = false
    end
  end

  def self.parse_data
    body = JSON.parse(data.body)
    parts_of_speech = body.keys
    matches = parts_of_speech.map do |pos|
      (body[pos]['syn'] || []) + (body[pos]['sim'] || [])
    end.flatten
  end

  def self.fetch_related_word
    related_word = parse_location
    fetch_data(related_word)
  end

  def self.parse_location
    data.headers['location'].scan(/\/[a-z]+\/json$/).first[1..-6]
  end
end