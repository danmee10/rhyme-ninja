json.array! @rhymes do |rhyme|
  json.(rhyme, *Rhyme.attribute_names)
end