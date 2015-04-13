json.rhymes @rhymes do |rhyme|
  json.(rhyme, *Rhyme.attribute_names)
end